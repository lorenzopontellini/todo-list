import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { UpdateNameRequest } from "../schema/user.schema";
import { toUserDto } from "../utils/mapper";
import { UserSchema, UserSchemaOrError } from "../schema/auth.schema";

export async function updateName(
  req: Request<{}, UserSchema, UpdateNameRequest>, 
  res: Response<UserSchema>) {
  
  const user = (req as any).user;
  const { name } = req.body;

  const newuser = await prisma.user.update({
    where: { id: user.id },
    data: { name }
  });

  res
  .status(200)
  .json(toUserDto(newuser));
}

export async function me(
  req: Request<{}, UserSchemaOrError, {}>, 
  res: Response<UserSchemaOrError>
) {
  
  const user = (req as any).user;
  const u = await prisma.user.findUnique({ 
    where: { id: user.id }
   });

  if (!u) 
    return res.status(404).json({ error: "User not found" });
  
  res
  .json(toUserDto(u));
}