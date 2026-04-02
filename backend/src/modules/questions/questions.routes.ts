import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { createQuestionSchema, updateQuestionSchema, listQuestionsQuerySchema } from './questions.schema';
import * as ctrl from './questions.controller';

const router = Router();

// Authenticated learner reads
router.get('/', authenticate, validate(listQuestionsQuerySchema, 'query'), ctrl.list);
router.get('/:id', authenticate, ctrl.getById);

// Admin writes
router.get('/admin/all', authenticate, requireRole('ADMIN'), ctrl.adminList);
router.post('/', authenticate, requireRole('ADMIN'), validate(createQuestionSchema), ctrl.create);
router.patch('/:id', authenticate, requireRole('ADMIN'), validate(updateQuestionSchema), ctrl.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), ctrl.remove);

export default router;
