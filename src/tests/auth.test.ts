import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/prismaClient";

beforeAll(async () => {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth & tasks - minimal", () => {
  it("register -> login -> get profile", async () => {
    const email = "test@example.com";
    const password = "password123";

    const reg = await request(app).post("/api/auth/register").send({ email, password, name: "Test" });
    expect(reg.status).toBe(201);
    expect(reg.body.email).toBe(email);

    const login = await request(app).post("/api/auth/login").send({ email, password });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();

    const token = login.body.token;

    const me = await request(app).get("/api/auth/me").set("Authorization", `Bearer ${token}`);
    expect(me.status).toBe(200);
    expect(me.body.email).toBe(email);
  }, 20000);
});
