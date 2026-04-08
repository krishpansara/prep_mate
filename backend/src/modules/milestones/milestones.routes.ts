import { z } from 'zod';
import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { Milestone } from '../../models/Milestone';

const createMilestoneSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().min(1).max(300),
});

const router = Router();
router.use(authenticate);

// GET /me/milestones — most recent first
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const milestones = await Milestone.find({ userId: req.user!.id }).sort({ createdAt: -1 }).limit(50);
    res.json(milestones);
  } catch (err) { next(err); }
});

// POST /me/milestones
router.post('/', validate(createMilestoneSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const milestone = await Milestone.create({ ...req.body, userId: req.user!.id });
    res.status(201).json(milestone);
  } catch (err) { next(err); }
});

export default router;
