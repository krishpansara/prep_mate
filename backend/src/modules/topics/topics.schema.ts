import { z } from 'zod';

export const createTopicSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).optional(), // auto-generated if omitted
  description: z.string().min(10).max(1000),
  icon: z.string().default('category'),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a hex color').default('#0053db'),
  order: z.number().int().min(0).default(0),
  published: z.boolean().default(false),
});

export const updateTopicSchema = createTopicSchema.partial();

export type CreateTopicInput = z.infer<typeof createTopicSchema>;
export type UpdateTopicInput = z.infer<typeof updateTopicSchema>;
