import { Request, Response, response } from "express";
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

import {
  generarMensajeCambioEmail,
  htmlTemplateCred,
} from "../helpers/html.js";

import { caluculateAge } from "../helpers/age.js";
import { TesisProjectService } from "../services/TesisProject.js";

export const ProfesorController = {
  createProfesor: async (req: Request, res: Response) => {
    try {
      const profesorData = matchedData(req, { locations: ["body"] });
      const age = caluculateAge(profesorData.ci);

      const new_user = await UserService.registerUser({
        role: UserRole.Profesor,
        email: profesorData.email,
      });

      // Create the profesor
      const createdProfesor = await ProfesorService.createProfesor({
        ...(profesorData as ProfesorType),
        user_id: new_user.user.id,
        age,
      });
      console.log(createdProfesor.email);
      console.log(new_user.user.username);

      // Send the email with the credentials
      const info = await EmailService.sendEmail({
        to: createdProfesor.email,
        html: `${htmlTemplateCred(
          new_user.user.username,
          new_user.user.password
        )}`,
      });

      return handleResponse({
        statusCode: 201,
        msg: "Profesor created successfully",
        data: createdProfesor,
        res,
      });
    } catch (error: any) {
      console.log(error);

      handleResponse({
        statusCode: 500,
        msg: "Error creating Profesor",
        error: ErrorHandlerFactory.createError(error),
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
      const { id } = matchedData(req, { locations: ["params"] });
      const profesorData = matchedData(req, {
        locations: ["body"],
      }) as ProfesorType;
      console.log(id);
      console.log(profesorData);

      if (Object.keys(profesorData).length >= 1) {
        let dynamicObject: any = new Object();

        // Set the new ci and recalculate the age if the ci is in the profesorData
        if (profesorData.ci) {
          dynamicObject.ci = profesorData.ci;
          dynamicObject.age = caluculateAge(profesorData.ci);
        }

        // Update the user if email
        if (profesorData.email) {
          const {
            user: { username, password },
          } = await UserService.updateUser({
            userId: profesorData.user_id,
            newEmail: profesorData.email,
          });

          // Send email
          await EmailService.sendEmail({
            to: profesorData.email,
            html: generarMensajeCambioEmail(
              username,
              profesorData.email,
              password
            ),
          });
        }

        // Do somthing just if the body has at least a key with a value
        const updatedProfesor = await ProfesorService.updateProfesor(id, {
          ...profesorData,
          ...dynamicObject,
        });

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
      } else {
        return handleResponse({
          res,
          statusCode: 400,
          error: {
            error: { name: "ValidationError", message: "Nothing to update" },
          },
        });
      }
    } catch (error: any) {
      console.log(error);

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
      // const profesorId = req.params.id;
      const { id: profesorId } = matchedData(req, { locations: ["params"] });
      // TODO: Get th user_id of the profesor
      const profesor = await ProfesorService.getProfesorById(profesorId);

      if (profesor) {
        await Promise.all([
          UserService.deactivateUser({ userId: profesor.user_id }), //Deactivate the user
          ProfesorService.deleteProfesor(profesorId), //Set the profesor as ancient
          TesisProjectService.removeMemberFromTesisProject({
            typeOfMember: UserRole.Profesor,
            memberId: profesorId as any,
          }), //Remove the profesor of any linked tesis_project
        ]);
      }

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
