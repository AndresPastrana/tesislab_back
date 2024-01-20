import { handleResponse } from "./../middleware/handleResponse.js";
import { Response } from "express";
import { Request } from "express";
import MinioService from "../services/MinioService.js";
import { matchedData } from "express-validator";
import { ObjectId } from "mongoose";
import { DefenseService } from "../services/Defense.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { BucketsS3 } from "../const.js";
import * as AdmZip from "adm-zip";

export const FilesController = {
  async getFile(req: Request, res: Response) {
    try {
      const { bucket, filename } = matchedData(req, {
        locations: ["params"],
      }) as { bucket: string; filename: string };

      const bufferData = await MinioService.getInstance().getFile(
        bucket,
        filename
      );

      if (bufferData !== null) {
        // Set response headers
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${filename}`
        );

        // Send the file data as the response
        res.status(200).send(bufferData);
      } else {
        // Handle the case when bufferData is null (e.g., send an error response)
        res.status(404).json({ error: "File not found" });
      }
    } catch (error) {
      // Handle other errors (e.g., log and send an error response)
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getRarTesisInfo(req: Request, res: Response) {
    try {
      const { id } = matchedData(req, { locations: ["params"] }) as {
        id: ObjectId;
      };

      // TODO:Get the info of the defense

      const defense = await DefenseService.getDefenseById(id);
      if (!defense) {
        const err = ErrorHandlerFactory.createError(
          new Error("Defense not found")
        );
        return handleResponse({ res, statusCode: 404, error: err });
      }

      // TODO: Get the links of the doc and the pres file
      const { doc_url, pres_url } = defense;
      console.log(doc_url, pres_url);

      // Define a regular expression to match the pattern
      const regex = /\/api\/files\/(\w+)\/([\w-]+\.pdf|[\w-]+\.pptx)/;

      // Use the regex to extract the values for doc_url
      const doc_match = doc_url.match(regex);
      const doc_name = doc_match ? doc_match[2] : null;

      // Use the regex to extract the values for pres_url
      const pres_match = pres_url.match(regex);
      const pres_name = pres_match ? pres_match[2] : null;

      if (doc_name && pres_name) {
        const minioInstance = MinioService.getInstance();
        // // TODO: Get the buffer of the files
        const [docBuffer, presBuffer] = await Promise.all([
          minioInstance.getFile(BucketsS3.AcademicDocs, doc_name),
          minioInstance.getFile(BucketsS3.AcademicDocs, pres_name),
        ]);

        if (docBuffer && presBuffer) {
          // Create a .zip file using adm-zip
          const zip = new AdmZip.default();
          zip.addFile(doc_name, docBuffer, "Document");
          zip.addFile(pres_name, presBuffer, "Presentation");
          const zipBuffer = zip.toBuffer();

          // Set the response headers for a zip file
          res.setHeader("Content-Type", "application/zip");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename=tesis.zip`
          );

          // TODO: End the response and send the zip
          // Send the zip file as the response
          res.end(zipBuffer);
        }
      }
    } catch (error) {
      // Handle other errors (e.g., log and send an error response)
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
