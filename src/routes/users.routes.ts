import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import { validateBody } from "../utils/validation";
import { updateNameSchema } from "../schema/schemas";
import { updateName } from "../controllers/user.controller";

const router = Router();

router.use(authMiddleware);


/**
 * @openapi
 * /api/auth/me:
 *   patch:
 *     tags:
 *       - Auth
 *     summary: Aggiorna il nome dell'utente autenticato
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
 *         description: Utente aggiornato con successo
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
 *         description: Errore di validazione input
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
 *                         example: "Il nome non può essere vuoto"
 *       '401':
 *         description: Non autorizzato / Token mancante o non valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Errore interno del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Errore durante l'aggiornamento"
 */
router.patch("/update", validateBody(updateNameSchema), updateName);

export default router;
