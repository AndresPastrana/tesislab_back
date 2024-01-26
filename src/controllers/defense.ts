import { Request, Response } from "express";
import { BucketsS3 } from "../const.js";
import { uploadFile } from "../helpers/minio.js"; // Import the uploadFile function
import { matchedData } from "express-validator";
import { DefenseService } from "../services/Defense.js";
import { DefenseData } from "../models/Defensa.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { CustomError, ErrorHandlerFactory } from "../errors/error.js";
import { error } from "console";

export class DefenseController {
  /**
   * Handles the creation of a new defense record.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */

  static async createDefense(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body as DefenseData;

      const { keyWords, project, recoms, evaluation, court, date, app_type } =
        data;
      console.log(req.files);

      const docFiles = req.files["docFile"];
      const presFiles = req.files["presFile"];
      const oponent_reportFiles = req.files["oponent_report"];
      const tutor_opinionFiles = req.files["tutor_opinion"];

      // Ensure there is at least one file for each type
      if (
        !docFiles ||
        !presFiles ||
        !oponent_reportFiles ||
        !tutor_opinionFiles
      ) {
        throw new Error(
          "'docFile' , 'presFile', 'tutor_opinion' , 'oponent_report' are required."
        );
      }

      // Select the first file for each type
      const doc = docFiles[0];
      const pres = presFiles[0];
      const report = oponent_reportFiles[0];
      const opinion = tutor_opinionFiles[0];

      // Upload the files and get the URLs in the defense bucket
      const [doc_url, pres_url, oponent_report, tutor_opinion] =
        await Promise.all([
          uploadFile(doc, BucketsS3.AcademicDocs),
          uploadFile(pres, BucketsS3.AcademicDocs),
          uploadFile(report, BucketsS3.AcademicDocs),
          uploadFile(opinion, BucketsS3.AcademicDocs),
        ]);

      // Call the DefenseService to create a new defense record

      await DefenseService.createDefense({
        court,
        doc_url,
        pres_url,
        evaluation,
        keyWords,
        project,
        recoms,
        date,
        app_type,
        oponent_report,
        tutor_opinion,
      });

      // Send a success response
      return handleResponse({
        statusCode: 201,
        res,
        data: null,
      });
    } catch (error) {
      // Handle errors and send an error response
      console.error("Error in createDefense controller:", error?.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async search(req: Request, res: Response): Promise<void | any> {
    const { query = "" } = matchedData(req, { locations: ["query"] });

    try {
      const results = await DefenseService.search(query);
      // const results = DefenseService.search(query);
      return handleResponse({ res, statusCode: 200, data: results });
    } catch (error) {
      return handleResponse({ res, error: null, statusCode: 500 });
    }
  }
}
