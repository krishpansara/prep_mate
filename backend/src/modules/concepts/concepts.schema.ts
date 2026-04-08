import { z } from 'zod';

export const createConceptSchema = z.object({
  topicId: z.string().min(1, 'topicId is required'),
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).optional(),
  summary: z.string().min(10).max(500),
  body: z.string().min(1, 'Content body is required'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  hasCode: z.boolean().default(false),
  published: z.boolean().default(false),
});

export const updateConceptSchema = createConceptSchema.partial();

export type CreateConceptInput = z.infer<typeof createConceptSchema>;
export type UpdateConceptInput = z.infer<typeof updateConceptSchema>;
