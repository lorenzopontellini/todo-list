import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateUserRequest, CreateUserResponseOrError, LoginRequest, LoginResponseOrError} from "../schema/auth.schema";
import { toUserDto } from "../utils/mapper";
import { AuthRequest } from "../middlewares/auth.middleware";

dotenv.config();

export async function register(
  req: Request<{}, CreateUserResponseOrError, CreateUserRequest>, 
  res: Response<CreateUserResponseOrError>
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
  .json(toUserDto(user));
}

export async function login(
  req: Request<{}, LoginResponseOrError, LoginRequest>, 
  res: Response<LoginResponseOrError>
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ sub: String(user.id), email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  res.json({ token });
}
