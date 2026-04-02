import { Resend } from 'resend';
import { env } from '../config/env';
import { logger } from './logger';

const resend = new Resend(env.RESEND_API_KEY);

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: MailOptions): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    
    if (error) {
      throw new Error(`Resend Error: ${error.message}`);
    }
    
    logger.info({ to, subject, id: data?.id }, 'Email sent');
  } catch (err) {
    logger.error({ err, to, subject }, 'Failed to send email');
    throw err;
  }
}

export function verifyEmailHtml(link: string): string {
  return `
    <h2>Verify your PrepMate account</h2>
    <p>Click the link below to verify your email address. This link expires in 24 hours.</p>
    <a href="${link}" style="display:inline-block;padding:12px 24px;background:#0053db;color:#fff;border-radius:6px;text-decoration:none;">Verify Email</a>
    <p>If you didn't create an account, you can safely ignore this email.</p>
  `;
}

export function resetPasswordHtml(link: string): string {
  return `
    <h2>Reset your PrepMate password</h2>
    <p>Click the link below to reset your password. This link expires in 1 hour.</p>
    <a href="${link}" style="display:inline-block;padding:12px 24px;background:#0053db;color:#fff;border-radius:6px;text-decoration:none;">Reset Password</a>
    <p>If you didn't request a password reset, you can safely ignore this email.</p>
  `;
}
