import { z } from "zod";

/* Register */

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email()
});

export const registerSchemaRequest = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

/* Login */

export const loginSchemaResponse = z.object({
  token: z.string()
});

export const loginSchemaRequest = z.object({
  email: z.string().email(),
  password: z.string()
});

export const errorResponseSchema = z.object({
  error: z.string(),
  details: z.array(z.unknown()).optional()
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export type CreateUserRequest = z.infer<typeof registerSchemaRequest>;
export type UserSchema = z.infer<typeof userSchema>;
export type UserSchemaOrError = UserSchema | { error: string };

export type LoginRequest = z.infer<typeof loginSchemaRequest>;
export type LoginResponse = z.infer<typeof loginSchemaResponse>;
