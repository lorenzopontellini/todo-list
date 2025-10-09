import { UpdateNameBody } from "../schema/schemas";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export async function updateName(req: Request<{}, {}, UpdateNameBody>, res: Response) {
  const { name } = req.body;
  const { user } = req as any;

  await prisma.user.update({
    where: { id: user.id },
    data: { name }
  });

  res.status(204).send();
}