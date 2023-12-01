import { Request, Response } from "express";
import { CourtsService } from "../services/CourtService.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { ErrorHandlerFactory, CustomError } from "../errors/error.js";
import { Court } from "../models/Court.js";
import { matchedData } from "express-validator";

export class CourtsController {
  static async createCourt(req: Request, res: Response) {
    try {
      const courtData = matchedData(req) as Court;
      // return res.json({ courtData });
      // Continue with your logic using the validated data
      const createdCourt = await CourtsService.createCourt(courtData);

      // Respond with success
      handleResponse({
        statusCode: 201,
        msg: "Court created successfully",
        data: createdCourt,
        res,
      });
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error creating court",
        error: customError,
        res,
      });
    }
  }

  static async updateCourt(req: Request, res: Response): Promise<void> {
    try {
      const courtId = req.params.courtId;
      const courtData: Court = req.body;
      const updatedCourt = await CourtsService.editCourt(courtId, courtData);
      if (updatedCourt) {
        handleResponse({
          statusCode: 200,
          msg: "Court updated successfully",
          data: updatedCourt,
          res,
        });
      } else {
        handleResponse({
          statusCode: 404,
          msg: "Court not found",
          res,
        });
      }
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error updating court",
        error: customError,
        res,
      });
    }
  }

  static async getCourtById(req: Request, res: Response): Promise<void> {
    try {
      const courtId = req.params.courtId;
      const court = await CourtsService.getCourtInfoById(courtId);
      if (court) {
        handleResponse({
          statusCode: 200,
          msg: "Court retrieved successfully",
          data: court,
          res,
        });
      } else {
        handleResponse({
          statusCode: 404,
          msg: "Court not found",
          res,
        });
      }
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error retrieving court",
        error: customError,
        res,
      });
    }
  }

  static async deleteCourt(req: Request, res: Response): Promise<void> {
    try {
      const courtId = req.params.courtId;
      await CourtsService.removeCourt(courtId);
      handleResponse({
        statusCode: 200,
        msg: "Court deleted successfully",
        res,
      });
    } catch (error) {
      const customError: CustomError = ErrorHandlerFactory.createError(
        error as Error
      );
      handleResponse({
        statusCode: 500,
        msg: "Error deleting court",
        error: customError,
        res,
      });
    }
  }
}
