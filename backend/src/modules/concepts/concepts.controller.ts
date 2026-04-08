import { Request, Response, NextFunction } from 'express';
import * as service from './concepts.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.list(req)); } catch (err) { next(err); }
}

export async function adminList(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.adminList(req)); } catch (err) { next(err); }
}

export async function listByTopic(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.listByTopic(req.params['topicSlug']!, req)); } catch (err) { next(err); }
}

export async function getBySlug(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.getBySlug(req.params['slug']!)); } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await service.create(req.body, req.user!.id)); } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.update(req.params['id']!, req.body, req.user!.id)); } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try { await service.remove(req.params['id']!, req.user!.id); res.status(204).send(); } catch (err) { next(err); }
}
