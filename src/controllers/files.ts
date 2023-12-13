import { Response } from "express";
import { Request } from "express";
import MinioService from "../services/MinioService.js";
import { matchedData } from "express-validator";

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
};
