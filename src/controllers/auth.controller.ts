import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerSchema, loginSchema, RegisterBody } from "../schema/schemas";
dotenv.config();

export async function register(req: Request<{}, {}, RegisterBody>, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

  const { email, password, name } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, name }
  });

  res.status(201).json({ id: user.id});
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ sub: String(user.id), email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  res.json({ token });
}

export async function me(req: Request, res: Response) {
  const { user } = req as any;
  const u = await prisma.user.findUnique({ where: { id: user.id }, select: { id: true, email: true, name: true } });
  res.json(u);
}
