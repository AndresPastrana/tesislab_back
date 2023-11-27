import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { UserRole } from "../const.js";
import { ProfesorType } from "../models/Profesor.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import {
  ProfesorService,
  UserService,
  EmailService,
} from "../services/index.js";
import { handleResponse } from "../middleware/handleResponse.js";

import { htmlTemplateCred } from "../helpers/html.js";

export const ProfesorController = {
  createProfesor: async (req: Request, res: Response) => {
    try {
      const profesorData = matchedData(req, { locations: ["body"] });

      // TCretate the user
      const new_user = await UserService.registerUser({
        role: UserRole.Student,
        email: profesorData.email,
      });

      // Create the profesor
      const createdProfesor = await ProfesorService.createProfesor({
        ...(profesorData as ProfesorType),
        user_id: new_user.user.id,
      });

      // Send the email with the credentials
      const email = await EmailService.sendEmail({
        to: createdProfesor.email,
        html: `${htmlTemplateCred(
          new_user.user.username,
          new_user.user.password
        )}`,
      });
      handleResponse({
        statusCode: 201,
        msg: "Profesor created successfully",
        data: createdProfesor,
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error creating Profesor",
        error: customError,
        res,
      });
    }
  },

  getProfesores: async (req: Request, res: Response) => {
    try {
      const profesores = await ProfesorService.getProfesores();
      handleResponse({
        statusCode: 200,
        msg: "Profesores retrieved successfully",
        data: profesores,
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error retrieving Profesores",
        error: customError,
        res,
      });
    }
  },

  getProfesorById: async (req: Request, res: Response) => {
    try {
      const profesorId = req.params.id;
      const profesor = await ProfesorService.getProfesorById(profesorId);

      if (!profesor) {
        handleResponse({
          statusCode: 404,
          msg: "Profesor not found",
          res,
        });
        return;
      }

      handleResponse({
        statusCode: 200,
        msg: "Profesor retrieved successfully",
        data: profesor,
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error retrieving Profesor",
        error: customError,
        res,
      });
    }
  },

  updateProfesor: async (req: Request, res: Response) => {
    try {
      const profesorId = req.params.id;
      const profesorData = req.body;
      const updatedProfesor = await ProfesorService.updateProfesor(
        profesorId,
        profesorData
      );

      if (!updatedProfesor) {
        handleResponse({
          statusCode: 404,
          msg: "Profesor not found",
          res,
        });
        return;
      }

      handleResponse({
        statusCode: 200,
        msg: "Profesor updated successfully",
        data: updatedProfesor,
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error updating Profesor",
        error: customError,
        res,
      });
    }
  },

  deleteProfesor: async (req: Request, res: Response) => {
    try {
      const profesorId = req.params.id;
      await ProfesorService.deleteProfesor(profesorId);
      handleResponse({
        statusCode: 204,
        msg: "Profesor deleted successfully",
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error deleting Profesor",
        error: customError,
        res,
      });
    }
  },
};
