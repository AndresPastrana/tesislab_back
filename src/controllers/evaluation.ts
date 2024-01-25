import { EvaluationType } from "./../models/Evaluations";
import { Request, Response } from "express";
import { body, matchedData } from "express-validator";
import { EvaluationService } from "../services/EvaluationService.js";
import { handleResponse } from "../middleware/handleResponse.js"; // Update the path accordingly
import { EvaluationType } from "../models/Evaluations.js";
import { CustomError, ErrorHandlerFactory } from "../errors/error.js";
import { BucketsS3, EvalType } from "../const.js";
import { SubmissionType } from "../models/Submission.js";
import { uploadFile } from "../helpers/minio.js";

import { validateEditSubmissionFields } from "../helpers/others.js";
import { Types } from "mongoose";
import MinioService from "../services/MinioService.js";
import { Multer } from "multer";

export class EvaluationController {
  // Get all evaluations
  static async getAllEvaluations(req: Request, res: Response): Promise<void> {
    try {
      const evaluations = await EvaluationService.getAllEvaluations();
      handleResponse({ statusCode: 200, data: evaluations, res });
    } catch (error: any) {
      const customError: CustomError = ErrorHandlerFactory.createError(error);
      handleResponse({ statusCode: 500, error: customError, res });
    }
  }

  // Create a new evaluation
  static async createEvaluation(req: Request, res: Response): Promise<void> {
    try {
      const {
        description = null,
        endDate = null,
        status = null,
        type = null,
      } = req.body as Omit<EvaluationType, "resourcesFile">;

      const evalData: EvaluationType = {
        description,
        endDate,
        status,
        type,
        resourcesFile: null,
      };

      // Upload the file if any
      if (req.file) {
        const recursoUrl = await uploadFile(req.file, BucketsS3.Evaluaciones);
        evalData.resourcesFile = recursoUrl;
      }

      // Create the evaluation
      const createdEvaluation = await EvaluationService.createEvaluation(
        evalData
      );
      handleResponse({ statusCode: 201, data: createdEvaluation, res });
    } catch (error: any) {
      const customError: CustomError = ErrorHandlerFactory.createError(error);
      handleResponse({ statusCode: 500, error: customError, res });
    }
  }

  // Get all submissions by evaluation ID
  static async getAllSubmissionsByEvaluationId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id: evaluationId } = matchedData(req, {
        locations: ["params"],
      }) as {
        id: string;
      }; // Assuming the evaluation ID is in the route params

      const submissions =
        await EvaluationService.getAllSubmissionsByEvaluationId(evaluationId);
      handleResponse({ statusCode: 200, data: submissions, res });
    } catch (error: any) {
      const customError: CustomError = ErrorHandlerFactory.createError(error);
      handleResponse({ statusCode: 500, error: customError, res });
    }
  }

  // Edit an existing evaluation
  static async editEvaluation(req: Request, res: Response): Promise<void> {
    try {
      const evaluationId = req.params.evaluationId; // Assuming the evaluation ID is in the route params
      const updatedData = req.body as EvaluationType;

      if (req.file) {
        const file = req.file;
        // TODO:
        // Delete the prev file
        // await MinioService.getInstance().deleteFile(BucketsS3.Evaluaciones, file.filename)
        // Upload the new file

        const fileUrl = await uploadFile(file, BucketsS3.Evaluaciones);
        updatedData.resourcesFile = fileUrl;
      }

      const updatedEvaluation = await EvaluationService.editEvaluation(
        evaluationId,
        updatedData
      );

      if (updatedEvaluation) {
        handleResponse({ statusCode: 200, data: updatedEvaluation, res });
      } else {
        handleResponse({
          statusCode: 404,
          error: {
            name: "NotFoundError",
            message: `Evaluation with ID ${evaluationId} not found`,
          },
          res,
        });
      }
    } catch (error: any) {
      const customError: CustomError = ErrorHandlerFactory.createError(error);
      handleResponse({ statusCode: 500, error: customError, res });
    }
  }

  // Submission
  // Get the submission of an especific evaluation of a student
  static async getStudentSubmission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { eval_id, student_id } = matchedData(req, {
        locations: ["params"],
      }) as {
        eval_id: string;
        student_id: string;
      }; // Assuming the student ID is in the query params
      const submissions = await EvaluationService.getStudentSubmission(
        student_id,
        eval_id
      );
      handleResponse({ statusCode: 200, data: submissions, res });
    } catch (error: any) {
      const customError: CustomError = ErrorHandlerFactory.createError(error);
      handleResponse({ statusCode: 500, error: customError, res });
    }
  }

  // Create a new submission for a specific evaluation
  static async createSubmission(req: Request, res: Response) {
    try {
      const { evaluation_id } = req.body as Partial<SubmissionType>;
      const file = req.file;
      console.log(file);

      if (!file) {
        return handleResponse({
          res,
          error: ErrorHandlerFactory.createError(new Error("")),
          statusCode: 400,
        });
      }

      const file_url = await uploadFile(file, BucketsS3.Evaluaciones);

      const createdSubmission = await EvaluationService.createSubmission({
        evaluation_id,
        student_id: new Types.ObjectId(req.user?.userId as string),
        file: file_url,
      });

      return handleResponse({ statusCode: 201, data: createdSubmission, res });
    } catch (error: any) {
      console.log(error);

      const customError: CustomError = ErrorHandlerFactory.createError(error);
      return handleResponse({ statusCode: 500, error: customError, res });
    }
  }

  // Edit an existing submission
  static async editSubmission(req: Request, res: Response) {
    try {
      const { id: submissionId } = matchedData(req, {
        locations: ["params"],
      }) as { id: string };

      // The fileds that can be edited are the "recoms" , "score" , "file"
      const body = req.body as Pick<SubmissionType, "recoms" | "score">;
      const file = req.file;

      // TODO: If has file.
      let updatedData: Partial<
        Pick<SubmissionType, "file" | "score" | "recoms">
      >;
      updatedData = { ...body, score: Number(body.score) };
      console.log("Data");
      console.log(updatedData);

      // TODO: Edit the file url
      // if (file) {
      //   // TODO: This code can only be executed if the loged user is an student
      //   //  -Get the previous file name and bucket
      //   const subInfo = await ModelSubmission.findById(submissionId);
      //   const parserurl = parseFileUrl(subInfo?.file as string);

      //   //
      //   const fileServer = MinioService.getInstance();
      //   //  -Delete the prev file of the minio server
      //   await fileServer.deleteFile(parserurl.bucketName, parserurl.objectName);
      //   //  -Upload the new file and get the url
      //   const newFileUrl = await uploadFile(file, BucketsS3.Evaluaciones);

      //   // Appedn the new file to the updated data
      //   updatedData.file = newFileUrl;
      // }

      const validationErrors = validateEditSubmissionFields({
        recoms: updatedData.recoms,
        score: updatedData.score,
      });

      if (validationErrors.length > 0) {
        return handleResponse({
          statusCode: 400,
          error: {
            name: "Validation Error",
            message: `Errors: ${validationErrors.join(", ")}`,
          },
          res,
        });
      }

      // Edit the submission
      const updatedSubmission = await EvaluationService.editSubmission(
        submissionId,
        updatedData
      );

      if (updatedSubmission) {
        return handleResponse({
          statusCode: 200,
          data: updatedSubmission,
          res,
        });
      } else {
        return handleResponse({
          statusCode: 404,
          error: {
            name: "NotFoundError",
            message: `Submission with ID ${submissionId} not found`,
          },
          res,
        });
      }
    } catch (error: any) {
      const customError: CustomError = ErrorHandlerFactory.createError(error);
      handleResponse({ statusCode: 500, error: customError, res });
    }
  }

  // Get all evaluations and their corresponding submissions for a given student
  static async getAllEvaluationsWithSub(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { student_id } = matchedData(req, {
        locations: ["params"],
      }) as {
        student_id: string;
      }; // Assuming the student ID is in the query params
      console.log(student_id);
      const evaluationSubmissions =
        await EvaluationService.getAllEvaluationsWithSub(student_id);

      handleResponse({ statusCode: 200, data: evaluationSubmissions, res });
    } catch (error: any) {
      const customError: CustomError = ErrorHandlerFactory.createError(error);
      handleResponse({ statusCode: 500, error: customError, res });
    }
  }
}
