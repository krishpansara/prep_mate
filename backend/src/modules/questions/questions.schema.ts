import { z } from 'zod';

export const createQuestionSchema = z.object({
  topicId: z.string().min(1, 'topicId is required'),
  title: z.string().min(2).max(300),
  problemStatement: z.string().min(10),
  constraints: z.string().optional(),
  example: z.string().optional(),
  solution: z.string().optional(),
  hint: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  concepts: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

export const updateQuestionSchema = createQuestionSchema.partial();

export const listQuestionsQuerySchema = z.object({
  topicId: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
