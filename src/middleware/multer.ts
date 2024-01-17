import { Request } from "express";
import multer, { Options } from "multer";
import { isValidFile } from "../helpers/files.js";
import { EvalAllowedExtensions } from "../const.js";

// Set up multer storage for file uploads
const storage = multer.memoryStorage(); // Store files in memory

// Limits
const limits = {
  fileSize: 50 * 1024 * 1024, // 50 MB limit (adjust as needed)
};

// Define a reusable file filter function
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  console.log("Inside multer");

  console.log(file);

  if (isValidFile(EvalAllowedExtensions, file)) {
    callback(null, true);
  } else {
    // Reject the file with a 404 error
    const error = new Error("Invalid file type");
    callback(error);
  }
};

// Multer configuration options
const multerConfig: Options = { storage, limits, fileFilter };

export const multerMiddleware = multer(multerConfig);
