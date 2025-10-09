import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean().optional()
});

export async function createTask(req: Request, res: Response) {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

  const user = (req as any).user;
  const task = await prisma.task.create({
    data: { ...parsed.data, userId: user.id }
  });
  res.status(201).json(task);
}

export async function listTasks(req: Request, res: Response) {
  const user = (req as any).user;
  const tasks = await prisma.task.findMany({ where: { userId: user.id } });
  res.json(tasks);
}

export async function getTask(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== user.id) return res.status(404).json({ error: "Not found" });
  res.json(task);
}

export async function updateTask(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) return res.status(404).json({ error: "Not found" });

  const data = req.body;
  const updated = await prisma.task.update({ where: { id }, data });
  res.json(updated);
}

export async function deleteTask(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) return res.status(404).json({ error: "Not found" });

  await prisma.task.delete({ where: { id } });
  res.status(204).send();
}
