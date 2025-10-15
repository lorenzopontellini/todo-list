import { Task, User } from "@prisma/client";
import { TaskSchema } from "../schema/task.schema";
import { UserSchema } from "../schema/auth.schema";

export function toTaskDto(task: Task): TaskSchema {
  return {
    id: task.id.toString(),
    title: task.title,
    description: task.description ?? undefined,
    completed: task.completed,
    creationDate: task.createdAt  
  };
} 

export function toTaskDtoList(tasks: Task[]): TaskSchema[] {
  return tasks.map(toTaskDto);
}

export function toUserDto(user: User): UserSchema {
  return {
    id: user.id.toString(),
    name: user.name ?? undefined,
    email: user.email
  };
}