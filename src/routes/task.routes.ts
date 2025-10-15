import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTask, listTasks, getTask, updateTask, deleteTask } from "../controllers/tasks.controller";
import { validateBody } from "../utils/validation";
import { createTaskSchema } from "../schema/task.schema";
import { updateTaskSchema } from "../schema/task.schema";

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Create a new task for authenticated user
 *     tags: [Auth, Tasks]
 *   requestBody:
 *     required: true
 *   content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateTaskRequest'
 *   responses:
 *     201:
 *       description: Task created successfully
 *       headers:   
 *         Location:
 *           description: URL of the created task
 *           schema:
 *             type: string
 *             example: /api/tasks/123
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskResponse'
 *     400:
 *       description: Invalid request
 *     401:
 *       description: Unauthorized
 */
router.post("/", validateBody(createTaskSchema), createTask);

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: List tasks for authenticated user
 *     tags: [Tasks]
 */
router.get("/all", listTasks);

router.get("/:id", getTask);
router.put("/:id", validateBody(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
