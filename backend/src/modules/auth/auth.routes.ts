import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { authenticate } from '../../middleware/authenticate';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './auth.schema';
import * as ctrl from './auth.controller';

import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts, please try again later.' },
});

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new account
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 8 }
 *     responses:
 *       201: { description: Account created }
 *       400: { description: Validation error }
 *       409: { description: Email already exists }
 */
router.post('/register', authLimiter, validate(registerSchema), ctrl.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive access token
 *     tags: [Auth]
 *     security: []
 */
router.post('/login', authLimiter, validate(loginSchema), ctrl.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Exchange refresh cookie for new access token
 *     tags: [Auth]
 *     security: []
 */
router.post('/refresh', ctrl.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout and invalidate refresh token
 *     tags: [Auth]
 */
router.post('/logout', authenticate, ctrl.logout);

/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verify email address via token link
 *     tags: [Auth]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema: { type: string }
 */
router.get('/verify-email', ctrl.verifyEmail);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 *     security: []
 */
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), ctrl.forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password via token
 *     tags: [Auth]
 *     security: []
 */
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), ctrl.resetPassword);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 */
router.get('/me', authenticate, ctrl.getMe);

export default router;
