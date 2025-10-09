import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { registerSchema, loginSchema } from "../schema/schemas";
import { validateBody } from "../utils/validation";

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registra un nuovo utente e restituisce l'ID dell'utente creato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Input validation failed
 */
router.post("/register", validateBody(registerSchema), register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Effettua il login e restituisce un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "utente@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Login effettuato con successo, restituisce token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT di autenticazione
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
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
 *                         example: "Invalid email format"
 *       '401':
 *         description: Credenziali non valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 */
router.post("/login", validateBody(loginSchema), login);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Restituisce i dati dell'utente autenticato
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Dati utente autenticato
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
 *                   example: "Mario Rossi"
 *       '401':
 *         description: Token mancante o non valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 */
router.get("/me", authMiddleware, me);


export default router;
