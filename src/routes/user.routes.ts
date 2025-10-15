import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import { validateBody } from "../utils/validation";
import { userUpdateNameSchemaRequest } from "../schema/user.schema";
import { me, updateName } from "../controllers/user.controller";

const router = Router();

router.use(authMiddleware);


/**
 * @openapi
 * /api/auth/me:
 *   patch:
 *     tags:
 *       - Auth
 *     summary: Update the authenticated user's name
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nuovo Nome"
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "utente@example.com"
 *                 name:
 *                   type: string
 *                   example: "Nuovo Nome"
 *       '400':
 *         description: Input validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Missing required field: name"
 *       '401':
 *         description: Not authorized / Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating user"
 */
router.patch("/update", validateBody(userUpdateNameSchemaRequest), updateName);


/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Retrieve authenticated user's information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               #ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad Request"
 *       '401':
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 */
router.get("/me", me);

export default router;
