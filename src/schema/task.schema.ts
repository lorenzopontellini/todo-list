import { z } from "zod";
import { ErrorResponse } from "./auth.schema";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  userId: z.string(),
  completed: z.boolean().default(false)
});

export type CreateTaskRequest = z.infer<typeof createTaskSchema>;

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(), 
  creationDate: z.date().optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export type CreateTaskResponseOrError = TaskSchema | ErrorResponse;

export type TaskResponseOrError = CreateTaskResponseOrError;

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  completed: z.boolean().optional(),
});

export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>;