import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { toTaskDto, toTaskDtoList } from "../utils/mapper";
import { CreateTaskRequest, CreateTaskResponse, createTaskSchema, TaskResponse, TaskResponseOrError, TaskSchema, UpdateTaskRequest, updateTaskSchema } from "../schema/task.schema";

export async function createTask(
  req: Request<{}, CreateTaskResponse, CreateTaskRequest>, 
  res: Response<CreateTaskResponse | { error: any }>
) {
  
  const user = (req as any).user;
  const { title, description, completed } = req.body;

  const task = await prisma
  .task
  .create({ data: { title, description, completed, userId: user.id }  });

  res
  .status(201)
  .location(`/api/tasks/${task.id}`)
  .json(toTaskDto(task));
}

export async function listTasks(
  req: Request<{}, TaskResponse[], {}>,
  res: Response<TaskResponse[]>
) {

  const user = (req as any).user;
  
  const tasks = await prisma.task.findMany({ where: { userId: user.id } });
  
  res
  .status(200)
  .location(`/api/tasks/${user.id}`)
  .json(toTaskDtoList(tasks));
}

export async function getTask(
  req: Request<{ id: string }, TaskResponseOrError, {}>,
  res: Response<TaskResponseOrError>
) {
  const user = (req as any).user;
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task || task.userId !== user.id) 
    return res.status(404).json({ error: "Task not found" });
  
  res
  .status(200)
  .location(`/api/tasks/${user.id}`)
  .json(toTaskDto(task));
}


export async function updateTask(
  req: Request<{ id: string }, TaskResponseOrError, UpdateTaskRequest>,
  res: Response<TaskResponseOrError>
) {

  const user = (req as any).user;
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({ where: { id } });
  
  if (!task || task.userId !== user.id) 
    return res.status(404).json({ error: "Task Not found" });

  const { title, description, completed } = req.body;

  const updated = await prisma.task.update({
    where: { id },
    data: { title, description, completed }
  });

  res
  .status(200)
  .location(`/api/tasks/${user.id}`)
  .json(toTaskDto(updated));
}

export async function deleteTask(
  req: Request<{ id: string }, TaskResponseOrError, {}>,
  res: Response<{}>
) {

  const user = (req as any).user;
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task || task.userId !== user.id) 
    return res.status(404).json({ error: "Task Not found" });

  await prisma.task.delete({ where: { id } });

  res
  .status(204)
  .send();
}
