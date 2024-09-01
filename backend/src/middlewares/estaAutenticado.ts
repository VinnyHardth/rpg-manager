import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const estaAutenticado = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.uid) next();
  else
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(ReasonPhrases.UNAUTHORIZED + ": Deve estar autenticado.");
};
