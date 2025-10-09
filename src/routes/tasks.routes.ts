import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTask, listTasks, getTask, updateTask, deleteTask } from "../controllers/tasks.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Create task for authenticated user
 *     tags: [Tasks]
 */
router.post("/", createTask);

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: List tasks for authenticated user
 *     tags: [Tasks]
 */
router.get("/", listTasks);

router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
