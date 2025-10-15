import { z } from "zod";

export const userUpdateNameSchemaRequest = z.object({
  name: z.string().min(1)
});

export type UpdateNameRequest = z.infer<typeof userUpdateNameSchemaRequest>;
