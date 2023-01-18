import { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError";

const errorHandler: ErrorRequestHandler = (err: AppError, _req, res, next) => {
  // console.log("Error occured! ", err);
  res.status(err.statusCode).send(`Error: ${err.message}`);
  next();
};

export default errorHandler;
