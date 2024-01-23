import { Request, Response } from "express";

import AcademicRankService from "../services/AcademicRankService.js";
import { RangoAcademico } from "../const.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { CustomError, ErrorHandlerFactory } from "../errors/error.js";
import { matchedData } from "express-validator";
import { AcademicRank } from "../models/AcademicRankModel.js";

class AcademicRankController {
  static async createAcademicRank(req: Request, res: Response): Promise<void> {
    try {
      const { rank } = matchedData(req, {
        locations: ["body"],
      }) as AcademicRank;
      const createdRank = await AcademicRankService.createAcademicRank(
        rank as RangoAcademico
      );
      handleResponse({
        statusCode: 201,
        msg: "Academic rank created successfully",
        data: createdRank,
        res,
      });
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error creating academic rank",
        error: customError,
        res,
      });
    }
  }

  static async getAllAcademicRanks(req: Request, res: Response): Promise<void> {
    try {
      const allRanks = await AcademicRankService.getAllAcademicRanks();
      handleResponse({
        statusCode: 200,
        msg: "Academic ranks retrieved successfully",
        data: allRanks,
        res,
      });
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error getting academic ranks",
        error: customError,
        res,
      });
    }
  }

  static async getAcademicRankById(req: Request, res: Response): Promise<void> {
    try {
      const rankId = req.params.id;
      const rank = await AcademicRankService.getAcademicRankById(rankId);
      if (rank) {
        handleResponse({
          statusCode: 200,
          msg: "Academic rank retrieved successfully",
          data: rank,
          res,
        });
      } else {
        handleResponse({
          statusCode: 404,
          msg: "Academic rank not found",
          res,
        });
      }
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error getting academic rank by ID",
        error: customError,
        res,
      });
    }
  }

  static async updateAcademicRank(req: Request, res: Response): Promise<void> {
    try {
      const { rank } = req.body;
      const updatedRank = await AcademicRankService.updateAcademicRank(
        req.params.id,
        { rank }
      );
      if (updatedRank) {
        handleResponse({
          statusCode: 200,
          msg: "Academic rank updated successfully",
          data: updatedRank,
          res,
        });
      } else {
        handleResponse({
          statusCode: 404,
          msg: "Academic rank not found",
          res,
        });
      }
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error updating academic rank",
        error: customError,
        res,
      });
    }
  }

  static async deleteAcademicRank(req: Request, res: Response): Promise<void> {
    try {
      const rankId = req.params.id;
      await AcademicRankService.deleteAcademicRank(rankId);
      handleResponse({
        statusCode: 204,
        msg: "Academic rank deleted successfully",
        res,
      });
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error deleting academic rank",
        error: customError,
        res,
      });
    }
  }
}

export default AcademicRankController;
