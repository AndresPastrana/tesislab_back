import { Request, Response } from "express";
import {
  TesisProjectInput,
  TesisProjectService,
} from "../services/TesisProject.js";
import { ErrorHandlerFactory } from "../errors/error.js";

import { body, matchedData } from "express-validator";
import { handleResponse } from "../middleware/handleResponse.js";
import { UserRole } from "../const.js";
import { Schema } from "mongoose";

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
      const { id: projectId, active } = matchedData(req, {
        locations: ["params", "query"],
      }) as { id: Schema.Types.ObjectId; active: boolean | string };

      const tesisProject = await TesisProjectService.getTesisProjectInfo(
        projectId,
        active as string
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

  static async approveTesisProject(
    req: Request & { user?: { userId: string } },
    res: Response
  ): Promise<void> {
    try {
      const { id, recoms } = matchedData(req, {
        locations: ["params", "body"],
      }) as {
        id: string;
        recoms: string;
      };
      const uid = req.user?.userId as string;
      const approvedTesisProject =
        await TesisProjectService.approveTesisProject(id, recoms, uid);
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
      const { id: projectId } = matchedData(req, { locations: ["params"] }) as {
        id: string;
      };
      const { functionalRequirements } = matchedData(req, {
        locations: ["body"],
      }) as { functionalRequirements: string[] };

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

  static async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const { active = true } = matchedData(req, { locations: ["query"] });
      const projects = await TesisProjectService.getAllProjects(active);
      handleResponse({ res, statusCode: 200, data: projects });
    } catch (error) {
      const customError = ErrorHandlerFactory.createError(error as any);
      handleResponse({ res, statusCode: 500, error: customError });
    }
  }
  static async getProjectsByMemberId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { memberId, memberType, active } = matchedData(req, {
        locations: ["query"],
      }) as {
        active: string;
        memberId: Schema.Types.ObjectId;
        memberType: UserRole.Profesor | UserRole.Profesor;
      };

      const projects = await TesisProjectService.getProjectsByMemberId(
        active,
        memberId,
        memberType
      );

      handleResponse({ res, statusCode: 200, data: projects });
    } catch (error) {
      const customError = ErrorHandlerFactory.createError(error as any);
      handleResponse({ res, statusCode: 500, error: customError });
    }
  }

  static async getProjectsStats(req: Request, res: Response) {
    try {
      const projectStats = await TesisProjectService.getTotalProjectsStatus();
      return handleResponse({ res, data: projectStats, statusCode: 200 });
    } catch (error) {
      const err = ErrorHandlerFactory.createError(error as Error);

      return handleResponse({ res, error: err, statusCode: 500 });
    }
  }
}
