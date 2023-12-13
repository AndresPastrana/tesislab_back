import { Response } from "express";
import { CustomError } from "../errors/error.js";

interface HandleResponseParam {
  statusCode: number;
  msg?: string;

  data?: any | null | Object;
  error?: CustomError | null;
  res: Response;
}
export const handleResponse = (paylaod: HandleResponseParam) => {
  const { error, data, msg, statusCode, res } = paylaod;
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    msg: msg || (statusCode >= 200 && statusCode < 300 ? "Success" : "Error"),
    data: data || null,
    error: error || null,
  };

  return res.status(statusCode).json(response);
};
