// Augment the Express Request interface globally so middlewares can attach `user`
import 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
