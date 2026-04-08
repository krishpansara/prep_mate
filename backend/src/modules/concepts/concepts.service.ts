import { Concept } from '../../models/Concept';
import { Topic } from '../../models/Topic';
import { slugify } from '../../utils/slug';
import { parsePagination, buildPaginatedResponse } from '../../utils/pagination';
import { createError } from '../../middleware/errorHandler';
import { CreateConceptInput, UpdateConceptInput } from './concepts.schema';
import { Request } from 'express';
import { AuditLog } from '../../models/AuditLog';

export async function list(req: Request) {
  const { page, limit, skip } = parsePagination(req);
  const filter = { published: true };
  const [concepts, total] = await Promise.all([
    Concept.find(filter).populate('topicId', 'name slug').sort({ createdAt: 1 }).skip(skip).limit(limit),
    Concept.countDocuments(filter),
  ]);
  return buildPaginatedResponse(concepts, total, { page, limit, skip });
}

export async function adminList(req: Request) {
  const { page, limit, skip } = parsePagination(req);
  const [concepts, total] = await Promise.all([
    Concept.find().populate('topicId', 'name slug').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Concept.countDocuments(),
  ]);
  return buildPaginatedResponse(concepts, total, { page, limit, skip });
}

export async function listByTopic(topicSlug: string, req: Request) {
  const topic = await Topic.findOne({ slug: topicSlug, published: true });
  if (!topic) throw createError('Topic not found', 404);

  const { page, limit, skip } = parsePagination(req);
  const filter = { topicId: topic._id, published: true };
  const [concepts, total] = await Promise.all([
    Concept.find(filter).sort({ createdAt: 1 }).skip(skip).limit(limit),
    Concept.countDocuments(filter),
  ]);
  return buildPaginatedResponse(concepts, total, { page, limit, skip });
}

export async function getBySlug(slug: string) {
  const concept = await Concept.findOne({ slug, published: true }).populate('topicId', 'name slug');
  if (!concept) throw createError('Concept not found', 404);
  return concept;
}

export async function create(input: CreateConceptInput, actorId: string) {
  const slug = input.slug ?? slugify(input.title);
  const exists = await Concept.findOne({ slug });
  if (exists) throw createError(`Slug "${slug}" already in use`, 409);

  const concept = await Concept.create({ ...input, slug });
  await AuditLog.create({ actorId, action: 'CONCEPT_CREATED', targetId: concept._id.toString() });
  return concept;
}

export async function update(id: string, input: UpdateConceptInput, actorId: string) {
  if (input.title && !input.slug) input.slug = slugify(input.title);
  const concept = await Concept.findByIdAndUpdate(id, input, { new: true, runValidators: true });
  if (!concept) throw createError('Concept not found', 404);
  await AuditLog.create({ actorId, action: 'CONCEPT_UPDATED', targetId: id });
  return concept;
}

export async function remove(id: string, actorId: string) {
  const concept = await Concept.findByIdAndDelete(id);
  if (!concept) throw createError('Concept not found', 404);
  await AuditLog.create({ actorId, action: 'CONCEPT_DELETED', targetId: id });
}
