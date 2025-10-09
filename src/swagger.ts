import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { optional } from "zod";

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mio Todo API",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string", format: "email" },
            name: { type: "string", optional: true}
          },
          required: ["id", "email"]
        },
        RegisterResponse: {
          type: "object",
          properties: {
            id: { type: "string" }
          },
          required: ["id"]
        },
        RegisterRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
            name: { type: "string", optional: true }
          },
          required: ["email", "password"]
        }
      }
    }
  },
  apis: ["./src/controllers/*.ts", "./src/routes/*.ts"]
};


const openapiSpec = swaggerJsdoc(options);

router.use("/", swaggerUi.serve, swaggerUi.setup(openapiSpec));

export { router as swaggerRouter };
