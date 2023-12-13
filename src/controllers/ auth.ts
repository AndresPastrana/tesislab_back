import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { ErrorHandlerFactory } from "../errors/error.js";
import { UserService } from "../services/index.js";
import { handleResponse } from "./../middleware/handleResponse.js";

export const AuthController = {
  loginUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = matchedData(req, { locations: ["body"] });
      const { token } = await UserService.loginUser({ username, password });
      handleResponse({
        statusCode: 200,
        msg: "Login successful",
        data: { token },
        res,
      });
    } catch (error: any) {
      handleResponse({
        statusCode: 400,
        error: ErrorHandlerFactory.createError(error),
        res,
      });
    }
  },
};
