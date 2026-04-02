import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { createConceptSchema, updateConceptSchema } from './concepts.schema';
import * as ctrl from './concepts.controller';

const router = Router();

// Public
router.get('/', ctrl.list);
router.get('/topic/:topicSlug', ctrl.listByTopic);
router.get('/:slug', ctrl.getBySlug);

// Admin
router.get('/admin/all', authenticate, requireRole('ADMIN'), ctrl.adminList);
router.post('/', authenticate, requireRole('ADMIN'), validate(createConceptSchema), ctrl.create);
router.patch('/:id', authenticate, requireRole('ADMIN'), validate(updateConceptSchema), ctrl.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), ctrl.remove);

export default router;
