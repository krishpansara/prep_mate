import { Topic } from '../../models/Topic';
import { slugify } from '../../utils/slug';
import { parsePagination, buildPaginatedResponse } from '../../utils/pagination';
import { createError } from '../../middleware/errorHandler';
import { CreateTopicInput, UpdateTopicInput } from './topics.schema';
import { Request } from 'express';
import { AuditLog } from '../../models/AuditLog';

export async function listPublished(req: Request) {
  const { page, limit, skip } = parsePagination(req);
  const filter = { published: true };
  const [topics, total] = await Promise.all([
    Topic.find(filter).sort({ order: 1, createdAt: 1 }).skip(skip).limit(limit),
    Topic.countDocuments(filter),
  ]);
  return buildPaginatedResponse(topics, total, { page, limit, skip });
}

export async function getBySlug(slug: string) {
  const topic = await Topic.findOne({ slug, published: true });
  if (!topic) throw createError('Topic not found', 404);
  return topic;
}

export async function adminList(req: Request) {
  const { page, limit, skip } = parsePagination(req);
  const [topics, total] = await Promise.all([
    Topic.find().sort({ order: 1, createdAt: 1 }).skip(skip).limit(limit),
    Topic.countDocuments(),
  ]);
  return buildPaginatedResponse(topics, total, { page, limit, skip });
}

export async function create(input: CreateTopicInput, actorId: string) {
  const slug = input.slug ?? slugify(input.name);
  const exists = await Topic.findOne({ slug });
  if (exists) throw createError(`Slug "${slug}" already in use`, 409);

  const topic = await Topic.create({ ...input, slug });
  await AuditLog.create({ actorId, action: 'TOPIC_CREATED', targetId: topic._id.toString() });
  return topic;
}

export async function update(id: string, input: UpdateTopicInput, actorId: string) {
  if (input.name && !input.slug) input.slug = slugify(input.name);
  const topic = await Topic.findByIdAndUpdate(id, input, { new: true, runValidators: true });
  if (!topic) throw createError('Topic not found', 404);
  await AuditLog.create({ actorId, action: 'TOPIC_UPDATED', targetId: id });
  return topic;
}

export async function remove(id: string, actorId: string) {
  const topic = await Topic.findByIdAndDelete(id);
  if (!topic) throw createError('Topic not found', 404);
  await AuditLog.create({ actorId, action: 'TOPIC_DELETED', targetId: id });
}
