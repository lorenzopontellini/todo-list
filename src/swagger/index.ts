import { zodToJsonSchema } from "zod-to-json-schema";
import { errorResponseSchema, loginSchemaRequest, loginSchemaResponse, registerSchemaRequest } from "../schema/auth.schema";
import { userUpdateNameSchemaRequest } from "../schema/user.schema";

export const RegisterSchemaRequest = zodToJsonSchema(registerSchemaRequest, "RegisterSchemaRequest");
// export const RegisterSchemaResponse = zodToJsonSchema(registerSchemaResponse, "RegisterSchemaResponse");

export const LoginSchemaRequest = zodToJsonSchema(loginSchemaRequest, "LoginSchemaRequest");
export const LoginSchemaResponse = zodToJsonSchema(loginSchemaResponse, "LoginSchemaResponse");

export const UserUpdateNameSchemaRequest = zodToJsonSchema(userUpdateNameSchemaRequest, "UserUpdateNameSchemaRequest");
// export const UserSchema = zodToJsonSchema(userSchema, "UserSchema");

export const ErrorResponseSchema = zodToJsonSchema(errorResponseSchema, "ErrorResponseSchema");