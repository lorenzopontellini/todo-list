import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ErrorResponse, LoginRequest, LoginResponse, loginSchemaRequest, RegisterRequest, RegisterResponse, registerSchemaRequest } from "../schema/auth.schema";

dotenv.config();

export async function register(
  req: Request<{}, RegisterResponse, RegisterRequest>, 
  res: Response<RegisterResponse | ErrorResponse>
) {
  const { email, password, name } = req.body

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) return res.status(409).json({ error: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, name }
  });

  res
  .status(201)
  .json({ id: user.id. toString(), email: user.email, name: user.name || undefined });
}

export async function login(req: Request<{}, LoginResponse, LoginRequest>, res: Response<LoginResponse | ErrorResponse>) {
  const parsed = loginSchemaRequest.safeParse(req.body);
  if (!parsed.success) {
    const errorDetails = parsed.error.errors;
    return res.status(400).json({ error: "Invalid request", details: errorDetails });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ sub: String(user.id), email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  res.json({ token });
}
