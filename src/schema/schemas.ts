import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const updateNameSchema = z.object({
  name: z.string().min(1)
});

type LoginBody = z.infer<typeof loginSchema>;
type RegisterBody = z.infer<typeof registerSchema>;
type UpdateNameBody = z.infer<typeof updateNameSchema>;

export { RegisterBody, LoginBody, UpdateNameBody };