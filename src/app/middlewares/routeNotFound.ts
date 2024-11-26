import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const routeNotFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Api route not found!",
    error: "",
  });
};

export default routeNotFound;
