import { File } from "buffer";
// ... (other imports)

import { Request, Response } from "express";
import { BucketsS3 } from "../const.js";
import { DefenseService } from "../services/Defense.js";
import { uploadFile } from "../helpers/minio.js"; // Import the uploadFile function

export class DefenseController {
  /**
   * Handles the creation of a new defense record.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  static async createDefense(req: Request, res: Response): Promise<void> {
    try {
      // Extract necessary data from the request body
      const { studentId, key_words, recoms, evaluation, court } = req.body;

      const docFiles = req.files["docFile"];

      const presFiles = req.files["presFile"];

      // Ensure there is at least one file for each type
      if (!docFiles || !presFiles) {
        throw new Error("Both 'docFile' and 'presFile' are required.");
      }

      // Select the first file for each type
      const doc = docFiles[0];
      const pres = presFiles[0];

      // Upload the files and get the URLs in the defense bucket
      const [doc_url, pres_url] = await Promise.all([
        uploadFile(doc, BucketsS3.AcademicDocs),
        uploadFile(pres, BucketsS3.AcademicDocs),
      ]);
      console.log(doc_url);
      console.log(pres_url);

      // Call the DefenseService to create a new defense record
      await DefenseService.createDefense({
        studentId,
        key_words,
        recoms,
        evaluation,
        doc_url,
        pres_url,
        court,
      });

      // Send a success response
      res.status(201).json({ message: "Defense record created successfully." });
    } catch (error) {
      // Handle errors and send an error response
      console.error("Error in createDefense controller:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
