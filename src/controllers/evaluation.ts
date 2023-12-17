import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { EvaluationService } from "../services/EvaluationService.js";
import { handleResponse } from "../middleware/handleResponse.js"; // Update the path accordingly
import { EvaluationType } from "../models/Evaluations.js";
import { CustomError, ErrorHandlerFactory } from "../errors/error.js";
import { BucketsS3, EvalType } from "../const.js";
import { SubmissionType } from "../models/Submission.js";
import { uploadFile } from "../helpers/minio.js";

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
      const evaluationData = matchedData(req) as {
        type: EvalType;
        description: string;
        endDate: Date;
      };

      const createdEvaluation = await EvaluationService.createEvaluation(
        evaluationData
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
      const updatedData = matchedData(req) as Partial<EvaluationType>;
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
      const submissionData = req.body as Partial<SubmissionType>;

      // Get the submsion file
      const file = req.file;

      if (!file) {
        return;
      }

      const file_url = await uploadFile(file, BucketsS3.Evaluaciones);

      const createdSubmission = await EvaluationService.createSubmission({
        ...submissionData,
        file: file_url,
      });

      handleResponse({ statusCode: 201, data: createdSubmission, res });
    } catch (error: any) {
      console.log(error);

      const customError: CustomError = ErrorHandlerFactory.createError(error);
      handleResponse({ statusCode: 500, error: customError, res });
    }
  }

  // Edit an existing submission
  static async editSubmission(req: Request, res: Response): Promise<void> {
    try {
      const submissionId = req.params.submissionId; // Assuming the submission ID is in the route params
      const updatedData = matchedData(req) as Partial<SubmissionType>;
      const updatedSubmission = await EvaluationService.editSubmission(
        submissionId,
        updatedData
      );

      if (updatedSubmission) {
        handleResponse({ statusCode: 200, data: updatedSubmission, res });
      } else {
        handleResponse({
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
