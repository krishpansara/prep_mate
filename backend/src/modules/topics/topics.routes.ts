import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { createTopicSchema, updateTopicSchema } from './topics.schema';
import * as ctrl from './topics.controller';

const router = Router();

// Public
router.get('/', ctrl.listPublished);
router.get('/:slug', ctrl.getBySlug);

// Admin
router.get('/admin/all', authenticate, requireRole('ADMIN'), ctrl.adminList);
router.post('/', authenticate, requireRole('ADMIN'), validate(createTopicSchema), ctrl.create);
router.patch('/:id', authenticate, requireRole('ADMIN'), validate(updateTopicSchema), ctrl.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), ctrl.remove);

export default router;
