import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "joi";

/**
 * Middleware to validate the request body against a Joi schema.
 *
 * @param schema - The Joi schema to validate the request body against.
 * @returns Middleware function that validates the request body.
 */
const validateRequestBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate the request body against the provided schema
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Report all validation errors, not just the first one
    });

    if (error) {
      // Respond with a 422 Unprocessable Entity status and validation errors
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: "Validation error",
        details: error.details,
      });
    }

    // Proceed to the next middleware or route handler
    next();
  };
};

export default validateRequestBody;
