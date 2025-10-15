import { zodToJsonSchema } from "zod-to-json-schema";
import { errorResponseSchema, loginSchemaRequest, loginSchemaResponse, registerSchemaRequest, userSchema } from "../schema/auth.schema";
import { userUpdateNameSchemaRequest } from "../schema/user.schema";

export const ErrorResponseSchema = zodToJsonSchema(errorResponseSchema, "ErrorResponseSchema");

export const UserSchema = zodToJsonSchema(userSchema, "UserSchema");
export const RegisterSchemaRequest = zodToJsonSchema(registerSchemaRequest, "RegisterSchemaRequest");

export const LoginSchemaRequest = zodToJsonSchema(loginSchemaRequest, "LoginSchemaRequest");
export const LoginSchemaResponse = zodToJsonSchema(loginSchemaResponse, "LoginSchemaResponse");

export const CreateTaskSchema = zodToJsonSchema(userSchema, "CreateTaskSchema");
export const TaskSchema = zodToJsonSchema(userSchema, "TaskSchema");
export const UpdateTaskSchema = zodToJsonSchema(userSchema, "UpdateTaskSchema");

export const UserUpdateNameSchemaRequest = zodToJsonSchema(userUpdateNameSchemaRequest, "UserUpdateNameSchemaRequest");