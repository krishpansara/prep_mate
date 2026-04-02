import { z } from 'zod';
import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { UserProgress } from '../../models/UserProgress';
import { Concept } from '../../models/Concept';
import { Milestone } from '../../models/Milestone';
import { createError } from '../../middleware/errorHandler';

const updateProgressSchema = z.object({
  progressPercent: z.number().int().min(0).max(100),
  lastSessionNote: z.string().max(200).optional(),
});

const router = Router();
router.use(authenticate);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const progress = await UserProgress.find({ userId: req.user!.id })
      .populate('topicId', 'name slug icon color');
    res.json(progress);
  } catch (err) { next(err); }
});

router.post('/concept/:conceptId/complete', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const concept = await Concept.findById(req.params['conceptId']);
    if (!concept) throw createError('Concept not found', 404);

    const topicId = concept.topicId;
    let progress = await UserProgress.findOne({ userId: req.user!.id, topicId });
    if (!progress) {
      progress = new UserProgress({ userId: req.user!.id, topicId, completedConcepts: [] });
    }

    if (!progress.completedConcepts.includes(concept._id)) {
      progress.completedConcepts.push(concept._id);
    }

    const totalConcepts = await Concept.countDocuments({ topicId, published: true });
    progress.progressPercent = totalConcepts === 0 ? 100 : Math.round((progress.completedConcepts.length / totalConcepts) * 100);
    await progress.save();

    if (progress.progressPercent === 100) {
      const milestoneExists = await Milestone.findOne({ userId: req.user!.id, title: 'Topic Mastered' });
      if (!milestoneExists) {
        await Milestone.create({
          userId: req.user!.id,
          title: 'Topic Mastered',
          subtitle: 'Completed all concepts in a topic!'
        });
      }
    }

    res.json(progress);
  } catch (err) { next(err); }
});

router.patch('/:topicId', validate(updateProgressSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const progress = await UserProgress.findOneAndUpdate(
      { userId: req.user!.id, topicId: req.params['topicId'] },
      req.body,
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json(progress);
  } catch (err) { next(err); }
});

export default router;
