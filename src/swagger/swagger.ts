import e from "express";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { CreateTaskSchema, ErrorResponseSchema, LoginSchemaRequest, LoginSchemaResponse, RegisterSchemaRequest, TaskSchema, UpdateTaskSchema, UserSchema, UserUpdateNameSchemaRequest } from ".";
import { unwrapSchema } from "../utils/utils";

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
        RegisterSchemaRequest: unwrapSchema(RegisterSchemaRequest) ,
        LoginSchemaRequest: unwrapSchema(LoginSchemaRequest) ,
        LoginSchemaResponse: unwrapSchema(LoginSchemaResponse) ,
        ErrorResponseSchema: unwrapSchema(ErrorResponseSchema) ,
        UserUpdateNameSchemaRequest: unwrapSchema(UserUpdateNameSchemaRequest) ,
        UserSchema: unwrapSchema(UserSchema),
        CreateTaskSchema: unwrapSchema(CreateTaskSchema),
        TaskSchema: unwrapSchema(TaskSchema),
        UpdateTaskSchema: unwrapSchema(UpdateTaskSchema)
      }
    }
  },
  apis: ["./src/controllers/*.ts", "./src/routes/*.ts"]
};


const openapiSpec = swaggerJsdoc(options);

router.use("/", swaggerUi.serve, swaggerUi.setup(openapiSpec));

export { router as swaggerRouter };
