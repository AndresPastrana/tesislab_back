import { Request, Response } from "express";
import AuthService from "../services/Auth.js";
import { matchedData } from "express-validator";
import { handleResponse } from "../middleware/handleResponse.js";

const login = async (req: Request, res: Response) => {
  try {
    const { username = "", password = "" } = matchedData(req);
    const access_token = await AuthService.login({ username, password });

    return handleResponse({
      res,
      data: {
        access_token,
      },
      statusCode: 200,
    });
  } catch (error) {
    const err = error as Error;
    return handleResponse({
      res,
      error,
      statusCode: 500,
      msg: err.message,
    });
  }
};

export const AuthController = {
  login,
};
