import express from "express";
import cors from "cors";
import "express-async-errors";
import authRoutes from "./routes/auth.routes";
import tasksRoutes from "./routes/tasks.routes";
import usersRoutes from "./routes/users.routes";
import { errorHandler } from "./utils/errorHandler";
import { swaggerRouter } from "./swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api-docs", swaggerRouter);

app.use(errorHandler);

export default app;
