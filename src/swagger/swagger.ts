import e from "express";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { optional } from "zod";
import { ErrorResponseSchema, LoginSchemaRequest, LoginSchemaResponse, RegisterSchemaRequest, RegisterSchemaResponse, UserSchema, UserUpdateNameSchemaRequest } from ".";

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
        // User: {
        //   type: "object",
        //   properties: {
        //     id: { type: "string" },
        //     email: { type: "string", format: "email" },
        //     name: { type: "string", optional: true}
        //   },
        //   required: ["id", "email"],
        //   example: { id: "123", email: "utente@example.com" }
        // },
        RegisterSchemaRequest,
        RegisterSchemaResponse,
        LoginSchemaRequest,
        LoginSchemaResponse,
        ErrorResponseSchema,
        UserUpdateNameSchemaRequest,
        UserSchema,
        CreateTaskRequest: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string", optional: true },
            userId: { type: "string" }
          },
          required: ["id", "title", "userId"]
        },
        CreateTaskResponse: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string", optional: true },
            userId: { type: "string" }
          },
          required: ["id", "title", "userId"]
        }
      }
    }
  },
  apis: ["./src/controllers/*.ts", "./src/routes/*.ts"]
};


const openapiSpec = swaggerJsdoc(options);

router.use("/", swaggerUi.serve, swaggerUi.setup(openapiSpec));

export { router as swaggerRouter };
