import { z } from 'zod';
import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import { User } from '../../models/User';
import { Topic } from '../../models/Topic';
import { Question } from '../../models/Question';
import { UserProgress } from '../../models/UserProgress';
import { Onboarding } from '../../models/Onboarding';
import { Streak } from '../../models/Streak';
import { AuditLog } from '../../models/AuditLog';
import { parsePagination, buildPaginatedResponse } from '../../utils/pagination';
import { createError } from '../../middleware/errorHandler';
import { stringify } from 'csv-stringify/sync';

const updateStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'BLOCKED']),
});

const router = Router();
router.use(authenticate, requireRole('ADMIN'));

// GET /admin/users
router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const filter: Record<string, unknown> = {};
    if (req.query['status']) filter['status'] = req.query['status'];

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);
    res.json(buildPaginatedResponse(users, total, { page, limit, skip }));
  } catch (err) { next(err); }
});

// GET /admin/users/:id
router.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params['id']);
    if (!user) throw createError('User not found', 404);
    res.json(user);
  } catch (err) { next(err); }
});

// PATCH /admin/users/:id/status
router.patch('/users/:id/status', validate(updateStatusSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params['id'],
      { status: req.body.status },
      { new: true }
    );
    if (!user) throw createError('User not found', 404);
    const action = req.body.status === 'BLOCKED' ? 'USER_BLOCKED' : 'USER_UNBLOCKED';
    await AuditLog.create({ actorId: req.user!.id, action, targetId: req.params['id'] });
    res.json(user);
  } catch (err) { next(err); }
});

// GET /admin/users/export — CSV stream
router.get('/users/export', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().lean();
    const rows = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      emailVerified: u.emailVerified,
      createdAt: u.createdAt?.toISOString(),
    }));
    const csv = stringify(rows, { header: true });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
    res.send(csv);
  } catch (err) { next(err); }
});

// GET /admin/audit-logs
router.get('/audit-logs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const [logs, total] = await Promise.all([
      AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('actorId', 'name email'),
      AuditLog.countDocuments(),
    ]);
    res.json(buildPaginatedResponse(logs, total, { page, limit, skip }));
  } catch (err) { next(err); }
});

// GET /admin/analytics
router.get('/analytics', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentYear = new Date().getFullYear();

    // User growth per month
    const userGrowthAgg = await User.aggregate([
      { $match: { createdAt: { $gte: new Date(currentYear, 0, 1) } } },
      { $group: { _id: { month: { $month: '$createdAt' } }, count: { $sum: 1 } } }
    ]);
    const userGrowth = Array(12).fill(0);
    userGrowthAgg.forEach(item => {
      userGrowth[item._id.month - 1] = item.count;
    });

    // Top Topics
    const topTopicsAgg = await UserProgress.aggregate([
      { $group: { _id: '$topicId', sessions: { $sum: 1 }, percent: { $avg: '$progressPercent' } } },
      { $sort: { sessions: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'topics', localField: '_id', foreignField: '_id', as: 'topicDoc' } },
      { $unwind: '$topicDoc' },
      { $project: { name: '$topicDoc.name', sessions: 1, percent: 1, _id: 0 } }
    ]);

    const [totalUsers, totalOnboarded, progressUserIds, totalStreaks, totalTopics, totalQuestions] = await Promise.all([
      User.countDocuments(),
      Onboarding.countDocuments(),
      UserProgress.distinct('userId'),
      Streak.countDocuments({ longestDays: { $gte: 14 } }),
      Topic.countDocuments(),
      Question.countDocuments(),
    ]);

    res.json({
      totalUsers, 
      totalTopics, 
      totalQuestions,
      userGrowth,
      topTopics: topTopicsAgg,
      funnel: {
        registered: totalUsers,
        completedOnboarding: totalOnboarded,
        solved5Questions: progressUserIds.length,
        hitStreak: totalStreaks,
        referredFriend: Math.floor(totalUsers * 0.08) // Placeholder calculation
      }
    });
  } catch (err) { next(err); }
});

export default router;
