import { Question } from '../../models/Question';
import { parsePagination, buildPaginatedResponse } from '../../utils/pagination';
import { createError } from '../../middleware/errorHandler';
import { CreateQuestionInput, UpdateQuestionInput } from './questions.schema';
import { Request } from 'express';
import { AuditLog } from '../../models/AuditLog';
import mongoose from 'mongoose';

export async function list(req: Request) {
  const { page, limit, skip } = parsePagination(req);
  const filter: Record<string, unknown> = { published: true };

  if (req.query['topicId']) filter['topicId'] = new mongoose.Types.ObjectId(req.query['topicId'] as string);
  if (req.query['difficulty']) filter['difficulty'] = req.query['difficulty'];

  const [questions, total] = await Promise.all([
    Question.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Question.countDocuments(filter),
  ]);
  return buildPaginatedResponse(questions, total, { page, limit, skip });
}

export async function adminList(req: Request) {
  const { page, limit, skip } = parsePagination(req);
  const filter: Record<string, unknown> = {};

  if (req.query['topicId']) filter['topicId'] = new mongoose.Types.ObjectId(req.query['topicId'] as string);
  if (req.query['difficulty']) filter['difficulty'] = req.query['difficulty'];
  if (req.query['status']) filter['published'] = req.query['status'] === 'PUBLISHED';

  const [questions, total] = await Promise.all([
    Question.find(filter).populate('topicId', 'name slug').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Question.countDocuments(filter),
  ]);
  return buildPaginatedResponse(questions, total, { page, limit, skip });
}

export async function getById(id: string) {
  if (!mongoose.isValidObjectId(id)) throw createError('Invalid question ID', 400);
  const question = await Question.findOne({ _id: id, published: true }).populate('topicId', 'name slug');
  if (!question) throw createError('Question not found', 404);
  return question;
}

export async function create(input: CreateQuestionInput, actorId: string) {
  const question = await Question.create(input);
  await AuditLog.create({ actorId, action: 'QUESTION_CREATED', targetId: question._id.toString() });
  return question;
}

export async function update(id: string, input: UpdateQuestionInput, actorId: string) {
  const question = await Question.findByIdAndUpdate(id, input, { new: true, runValidators: true });
  if (!question) throw createError('Question not found', 404);
  await AuditLog.create({ actorId, action: 'QUESTION_UPDATED', targetId: id });
  return question;
}

export async function remove(id: string, actorId: string) {
  const question = await Question.findByIdAndDelete(id);
  if (!question) throw createError('Question not found', 404);
  await AuditLog.create({ actorId, action: 'QUESTION_DELETED', targetId: id });
}
