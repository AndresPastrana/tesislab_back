import { Request, Response } from "express";
import {
  TesisProjectInput,
  TesisProjectService,
} from "../services/TesisProject.js";
import { ErrorHandlerFactory } from "../errors/error.js";

import { matchedData } from "express-validator";
import { handleResponse } from "../middleware/handleResponse.js";

export class TesisProjectController {
  static async createTesisProject(req: Request, res: Response) {
    try {
      const data = matchedData(req, {
        locations: ["body"],
      }) as TesisProjectInput;
      const newTesisProject = await TesisProjectService.createTesisProject(
        data
      );
      handleResponse({
        statusCode: 201,
        data: newTesisProject,
        res,
      });
    } catch (error) {
      const customError = ErrorHandlerFactory.createError(error as any);
      handleResponse({
        statusCode: 500,
        error: customError,
        res,
      });
    }
  }

  static async editTesisProject(req: Request, res: Response): Promise<void> {
    try {
      const projectId = req.params.id;
      const data = matchedData(req, {
        locations: ["body"],
      }) as TesisProjectInput;
      const updatedTesisProject = await TesisProjectService.editTesisProject(
        projectId,
        data
      );
      handleResponse({
        statusCode: 200,
        data: updatedTesisProject,
        res,
      });
    } catch (error) {
      const customError = ErrorHandlerFactory.createError(error as any);
      handleResponse({
        statusCode: 500,
        error: customError,
        res,
      });
    }
  }

  static async closeTesisProject(req: Request, res: Response): Promise<void> {
    // To close a tesis project se debe cumplir que
    // 1- The project must be aproved
    // 2- The student asocited must be realizado at least una evaluation de tipo predefensa
    // 3-La defensa de tesis tiene que tener el documento asociado
    try {
      const projectId = req.params.id;
      const isClosed = await TesisProjectService.closeTesisProject(projectId);
      handleResponse({
        statusCode: 200,
        data: { success: isClosed },
        res,
      });
    } catch (error) {
      const customError = ErrorHandlerFactory.createError(error as any);
      handleResponse({
        statusCode: 500,
        error: customError,
        res,
      });
    }
  }

  static async getTesisProjectInfo(req: Request, res: Response): Promise<void> {
    try {
      const projectId = req.params.id;
      const tesisProject = await TesisProjectService.getTesisProjectInfo(
        projectId
      );
      handleResponse({
        statusCode: 200,
        data: tesisProject,
        res,
      });
    } catch (error) {
      const customError = ErrorHandlerFactory.createError(error as any);
      handleResponse({
        statusCode: 500,
        error: customError,
        res,
      });
    }
  }

  static async approveTesisProject(req: Request, res: Response): Promise<void> {
    try {
      const projectId = req.params.id;
      const approvedTesisProject =
        await TesisProjectService.approveTesisProject(projectId);
      handleResponse({
        statusCode: 200,
        data: approvedTesisProject,
        res,
      });
    } catch (error) {
      const customError = ErrorHandlerFactory.createError(error as any);
      handleResponse({
        statusCode: 500,
        error: customError,
        res,
      });
    }
  }

  static async updateFunctionalRequirements(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const projectId = req.params.id;
      const functionalRequirements = req.body
        .functionalRequirements as string[];
      const updatedTesisProject =
        await TesisProjectService.updateFunctionalRequirements(
          projectId,
          functionalRequirements
        );
      handleResponse({
        statusCode: 200,
        data: updatedTesisProject,
        res,
      });
    } catch (error) {
      const customError = ErrorHandlerFactory.createError(error as any);
      handleResponse({
        statusCode: 500,
        error: customError,
        res,
      });
    }
  }
}
