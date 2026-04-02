import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { User } from '../../models/User';
import { RefreshToken } from '../../models/RefreshToken';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { sendMail, verifyEmailHtml, resetPasswordHtml } from '../../utils/mailer';
import { createError } from '../../middleware/errorHandler';
import { env } from '../../config/env';
import { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from './auth.schema';
import { logger } from '../../utils/logger';

const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ── Register ──────────────────────────────────────────────────────────────────
export async function register(input: RegisterInput) {
  const existing = await User.findOne({ email: input.email });
  if (existing) throw createError('An account with this email already exists', 409);

  const passwordHash = await bcrypt.hash(input.password, 12);
  const verifyToken = uuidv4();

  const user = await User.create({
    name: input.name,
    email: input.email,
    passwordHash,
    verifyToken,
    // Auto-verify in development so login works without a configured mail service
    emailVerified: env.NODE_ENV !== 'production',
  });

  const verifyLink = `${env.FRONTEND_URL}/verify-email?token=${verifyToken}`;
  try {
    await sendMail({
      to: user.email,
      subject: 'Verify your PrepMate email',
      html: verifyEmailHtml(verifyLink),
    });
  } catch (mailErr) {
    // Email delivery is best-effort. Don't fail registration if mailer is misconfigured.
    logger.warn({ mailErr, email: user.email }, 'Verification email failed to send — account still created');
  }

  return { message: 'Account created. Please check your email to verify.' };
}


// ── Login ─────────────────────────────────────────────────────────────────────
export async function login(input: LoginInput) {
  const user = await User.findOne({ email: input.email }).select('+passwordHash');
  if (!user) throw createError('Invalid email or password', 401);
  if (user.status === 'BLOCKED') throw createError('Your account has been blocked', 403);

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw createError('Invalid email or password', 401);

  if (!user.emailVerified) throw createError('Please verify your email before logging in', 403);

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const rawRefreshToken = signRefreshToken(user._id.toString());

  await RefreshToken.create({
    token: rawRefreshToken,
    userId: user._id,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
  });

  return { accessToken, refreshToken: rawRefreshToken, user };
}

// ── Refresh ───────────────────────────────────────────────────────────────────
export async function refresh(oldToken: string) {
  let payload: { sub: string };
  try {
    payload = verifyRefreshToken(oldToken);
  } catch {
    throw createError('Invalid refresh token', 401);
  }

  const stored = await RefreshToken.findOne({ token: oldToken });
  if (!stored) throw createError('Refresh token not recognised', 401);
  if (stored.expiresAt < new Date()) {
    await RefreshToken.deleteOne({ _id: stored._id });
    throw createError('Refresh token expired', 401);
  }

  const user = await User.findById(payload.sub);
  if (!user || user.status === 'BLOCKED') throw createError('User not found or blocked', 401);

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const newRefreshToken = signRefreshToken(user._id.toString());
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);

  // Rotate atomically: replace old token record with new one in a single operation
  await RefreshToken.findOneAndReplace(
    { _id: stored._id },
    { token: newRefreshToken, userId: user._id, expiresAt },
    { upsert: true }
  );

  return { accessToken, newRefreshToken };
}

// ── Logout ────────────────────────────────────────────────────────────────────
export async function logout(refreshToken: string) {
  await RefreshToken.deleteOne({ token: refreshToken });
}

// ── Verify Email ──────────────────────────────────────────────────────────────
export async function verifyEmail(token: string) {
  const user = await User.findOne({ verifyToken: token }).select('+verifyToken');
  if (!user) throw createError('Invalid or expired verification link', 400);

  user.emailVerified = true;
  user.verifyToken = undefined;
  await user.save();

  return { message: 'Email verified successfully' };
}

// ── Forgot Password ───────────────────────────────────────────────────────────
export async function forgotPassword(input: ForgotPasswordInput) {
  const user = await User.findOne({ email: input.email });
  // Always respond the same way to prevent email enumeration
  if (!user) return { message: 'If an account exists, a reset link has been sent.' };

  const resetToken = uuidv4();
  const resetTokenExp = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  user.resetToken = resetToken;
  user.resetTokenExp = resetTokenExp;
  await user.save();

  const resetLink = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  await sendMail({
    to: user.email,
    subject: 'Reset your PrepMate password',
    html: resetPasswordHtml(resetLink),
  });

  return { message: 'If an account exists, a reset link has been sent.' };
}

// ── Reset Password ────────────────────────────────────────────────────────────
export async function resetPassword(input: ResetPasswordInput) {
  const user = await User.findOne({ resetToken: input.token }).select(
    '+resetToken +resetTokenExp'
  );
  if (!user || !user.resetTokenExp || user.resetTokenExp < new Date()) {
    throw createError('Invalid or expired reset link', 400);
  }

  user.passwordHash = await bcrypt.hash(input.password, 12);
  user.resetToken = undefined;
  user.resetTokenExp = undefined;
  await user.save();

  // Invalidate all refresh tokens for this user on password change
  await RefreshToken.deleteMany({ userId: user._id });

  return { message: 'Password reset successfully. Please log in.' };
}

// ── Get Me ────────────────────────────────────────────────────────────────────
export async function getMe(userId: string) {
  const user = await User.findById(userId);
  if (!user) throw createError('User not found', 404);
  return user;
}
