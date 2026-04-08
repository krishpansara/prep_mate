import { z } from 'zod';
import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { Onboarding } from '../../models/Onboarding';
import { createError } from '../../middleware/errorHandler';

const onboardingSchema = z.object({
  goal: z.enum(['faang', 'startup', 'switch', 'upskill']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  topics: z.array(z.string()).min(1, 'Select at least one topic'),
});

const router = Router();
router.use(authenticate);

// GET /me/onboarding
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const onboarding = await Onboarding.findOne({ userId: req.user!.id });
    if (!onboarding) throw createError('Onboarding not completed', 404);
    res.json(onboarding);
  } catch (err) { next(err); }
});

// POST /me/onboarding — create or update
router.post('/', validate(onboardingSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const onboarding = await Onboarding.findOneAndUpdate(
      { userId: req.user!.id },
      { ...req.body, userId: req.user!.id },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json(onboarding);
  } catch (err) { next(err); }
});

export default router;
