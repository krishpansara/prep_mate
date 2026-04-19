import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { Streak } from '../../models/Streak';

const router = Router();
router.use(authenticate);

// GET /me/streak
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const streak = await Streak.findOneAndUpdate(
      { userId: req.user!.id },
      {},
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(streak);
  } catch (err) { next(err); }
});

// POST /me/streak/ping — call once per session, increments streak if new calendar day
router.post('/ping', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let streak = await Streak.findOne({ userId: req.user!.id });
    if (!streak) {
      streak = await Streak.create({ userId: req.user!.id, currentDays: 1, longestDays: 1, lastActiveAt: new Date() });
      return res.json(streak);
    }

    const now = new Date();
    const last = streak.lastActiveAt;
    const daysSinceLast = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceLast === 0) return res.json(streak); // already pung today
    if (daysSinceLast === 1) {
      streak.currentDays += 1;
    } else {
      streak.currentDays = 1; // streak broken
    }
    streak.longestDays = Math.max(streak.longestDays, streak.currentDays);
    streak.lastActiveAt = now;
    await streak.save();
    res.json(streak);
  } catch (err) { next(err); }
});

export default router;
