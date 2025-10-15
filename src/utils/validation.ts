// small helper if you want to add validation middleware later
import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";

export function validateBody<T extends ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); // tipizzato & validato
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors
        });
      }
      next(error);
    }
  };
}
