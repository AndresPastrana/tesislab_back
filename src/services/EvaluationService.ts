import { EvaluationDocument, ModelEvaluation } from "../models/Evaluations.js";
import { EvaluationType } from "../models/Evaluations.js";
import { ModelSubmission, SubmissionDocument } from "../models/Submission.js";

interface PersonInfo {
  _id: string;
  name: string;
  lastname: string;
}

interface SubmissionPopoulatedStudentInfo {
  id: string;
  evaluation_id: string;
  student_id: PersonInfo;
  file: string;
  score: number | null;
  recoms: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SubmissionWithStudentInfo {
  id: string;
  evaluation_id: string;
  student: Omit<PersonInfo, "_id"> & { id: string };
  file: string;
  score: number | null;
  recoms: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Service class for handling evaluations and submissions.
 */
export class EvaluationService {
  private static modelEvaluation = ModelEvaluation;
  private static modelSubmission = ModelSubmission;

  /**
   * Create a new evaluation.
   * @param evaluationData - Data for creating the evaluation.
   * @returns Created evaluation document.
   */
  static async createEvaluation(
    evaluationData: Partial<EvaluationType>
  ): Promise<EvaluationDocument> {
    try {
      const newEvaluation = await this.modelEvaluation.create(evaluationData);
      return newEvaluation;
    } catch (error: any) {
      if (error.name === "ValidationError") {
        throw new Error(`Validation Error: ${error.message}`);
      } else {
        throw new Error(`Error creating evaluation: ${error.message}`);
      }
    }
  }

  /**
   * Get all submissions by evaluation ID.
   * @param evaluationId - ID of the evaluation.
   * @returns Array of submission documents.
   */
  static async getAllSubmissionsByEvaluationId(
    evaluationId: string
  ): Promise<SubmissionWithStudentInfo[]> {
    try {
      const submissions = await this.modelSubmission
        .find({ evaluation_id: evaluationId })
        .populate("student_id", "name lastname")
        .exec();

      if (submissions) {
        const mappedSubmissions: SubmissionWithStudentInfo[] = submissions.map(
          (submission: any) => ({
            id: submission._id.toString(),
            evaluation_id: submission.evaluation_id,
            student: {
              id: submission.student_id._id,
              name: submission.student_id.name,
              lastname: submission.student_id.lastname,
            },
            file: submission.file,
            score: submission.score,
            recoms: submission.recoms,
            createdAt: submission.createdAt,
            updatedAt: submission.updatedAt,
          })
        );

        return mappedSubmissions;
      }

      return [];
    } catch (error: any) {
      throw new Error(
        `Error getting submissions by evaluation ID: ${error.message}`
      );
    }
  }
  /**
   * Edit an existing evaluation.
   * @param evaluationId - ID of the evaluation to edit.
   * @param updatedData - Updated data for the evaluation.
   * @returns Updated evaluation document or null if not found.
   */
  static async editEvaluation(
    evaluationId: string,
    updatedData: Partial<EvaluationType>
  ): Promise<EvaluationDocument | null> {
    try {
      const updatedEvaluation = await this.modelEvaluation
        .findByIdAndUpdate(evaluationId, updatedData, { new: true })
        .exec();
      if (!updatedEvaluation) {
        throw new Error(`Evaluation with ID ${evaluationId} not found`);
      }
      return updatedEvaluation;
    } catch (error: any) {
      throw new Error(`Error editing evaluation: ${error.message}`);
    }
  }

  /**
   * Get the student's submission of an especific evaluation.
   * @param studentId - ID of the student.
   *  @param eval_id - ID of the evaluation.
   * @returns A submission document.
   */
  static async getStudentSubmission(
    studentId: string,
    eval_id: string
  ): Promise<SubmissionDocument> {
    try {
      const submission = await this.modelSubmission
        .findOne({ student_id: studentId, evaluation_id: eval_id })
        .exec();

      if (!submission) {
        throw new Error("Submission not found");
      }
      return submission;
    } catch (error: any) {
      throw new Error(
        `Error getting submissions by student ID: ${error.message}`
      );
    }
  }

  /**
   * Get all evaluations.
   * @returns Array of evaluation documents.
   */
  static async getAllEvaluations(): Promise<EvaluationDocument[]> {
    try {
      const evaluations = await this.modelEvaluation.find().exec();
      return evaluations;
    } catch (error: any) {
      throw new Error(`Error getting all evaluations: ${error.message}`);
    }
  }

  // Submissions
  /**
   * Create a new submission for a specific evaluation.
   * @param submissionData - Data for creating the submission.
   * @returns Created submission document.
   */
  static async createSubmission(
    submissionData: Partial<SubmissionDocument>
  ): Promise<SubmissionDocument> {
    try {
      console.log(submissionData);

      const newSubmission = await this.modelSubmission.create(submissionData);
      return newSubmission;
    } catch (error: any) {
      if (error.name === "ValidationError") {
        throw new Error(`Validation Error: ${error.message}`);
      } else {
        throw new Error(`Error creating submission: ${error.message}`);
      }
    }
  }

  /**
   * Edit an existing submission.
   * @param submissionId - ID of the submission to edit.
   * @param updatedData - Updated data for the submission.
   * @returns Updated submission document or null if not found.
   */
  static async editSubmission(
    submissionId: string,
    updatedData: Partial<SubmissionDocument>
  ): Promise<SubmissionDocument | null> {
    try {
      const updatedSubmission = await this.modelSubmission
        .findByIdAndUpdate(submissionId, updatedData, { new: true })
        .exec();

      if (!updatedSubmission) {
        throw new Error(`Submission with ID ${submissionId} not found`);
      }

      return updatedSubmission;
    } catch (error: any) {
      throw new Error(`Error editing submission: ${error.message}`);
    }
  }

  /**
   * Get all evaluations and their corresponding submissions for a given student.
   * @param studentId - ID of the student.
   * @returns Array of objects with evaluation and corresponding submission.
   */
  static async getAllEvaluationsWithSub(
    studentId: string
  ): Promise<
    { evaluation: EvaluationDocument; submission: SubmissionDocument | null }[]
  > {
    try {
      const evaluations = await this.modelEvaluation.find().exec();
      const evaluationSubmissions: {
        evaluation: EvaluationDocument;
        submission: SubmissionDocument | null;
      }[] = [];

      for (const evaluation of evaluations) {
        console.log(evaluation._id);

        const submission = await this.modelSubmission
          .findOne({ student_id: studentId, evaluation_id: evaluation._id })
          .exec();

        evaluationSubmissions.push({
          evaluation,
          submission: submission || null, // If submission not found, set it to null
        });
      }

      return evaluationSubmissions;
    } catch (error: any) {
      throw new Error(
        `Error getting evaluations with submissions for student: ${error.message}`
      );
    }
  }
}
