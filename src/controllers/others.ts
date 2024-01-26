import { ModelStudent } from "../models/Student.js";
import { Request, Response } from "express";
import { ModelSubmission } from "../models/Submission.js";
import { ModelEvaluation } from "../models/Evaluations.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { matchedData } from "express-validator";
import { ObjectId } from "mongoose";
import { AppTypes, EvalType } from "../const.js";
import { readAppTypeKeywords } from "../helpers/others.js";
import { log } from "console";

interface StudentHistory {
  evaluaciones: Array<{
    type: EvalType;
    updatedAt: Date;
    score: number | null;
    file: string | null;
    recoms: string | null;
  }>;
}

export const getStudentHistory = async (req: Request, res: Response) => {
  try {
    const { id = null } = matchedData(req, { locations: ["params"] }) as {
      id: ObjectId;
    };

    // Get student information
    const student = await ModelStudent.findById(id).exec();

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Subimssion sorted by updatedAt Date
    const submissions = await ModelSubmission.find({
      student_id: id,
    })

      .sort({ updatedAt: -1 })
      .exec();

    const evalInfoPromises = submissions.map(async (submission) => {
      return await ModelEvaluation.findById(submission.evaluation_id).select(
        "type updatedAt createdAt"
      );
    });

    const evalInfoResolved = await Promise.all(evalInfoPromises);

    const mapedSubmissions = submissions.map((s) => {
      const evalauation = evalInfoResolved.find((ev) => {
        return ev?._id.toString() === s.evaluation_id.toString();
      });

      if (!evalauation) {
        throw new Error("Invalid eval id");
      }
      return {
        type: evalauation.type,
        updatedAt: s.updatedAt,
        score: s.score || null,
        file: s.file || null,
        recoms: s.recoms || null,
      };
    });

    const history: StudentHistory = { evaluaciones: mapedSubmissions };

    // TODO: Return  just the evaluation type , with the updatedAt Date, the socore and the score of the subition if has any
    return handleResponse({
      data: history,
      res,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error fetching student history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getKeywords = async (req: Request, res: Response) => {
  try {
    const { app } = req.body as { app: AppTypes };
    const keyWords = readAppTypeKeywords(app);
    if (keyWords) {
      return handleResponse({
        res,
        data: { [app]: keyWords },
        statusCode: 200,
      });
    }

    return handleResponse({ res, data: app, statusCode: 200 });
  } catch (error) {
    console.log(error);
  }
};
