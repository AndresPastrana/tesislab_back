import { BucketsS3 } from "../const.js";
import { SubmissionType } from "../models/Submission.js";

export const validateEditSubmissionFields = (data: Partial<SubmissionType>) => {
  const errors = [];

  // Validate 'recoms'
  if (data.recoms !== undefined) {
    if (typeof data.recoms !== "string" || data.recoms.length < 10) {
      errors.push(
        "Recoms must be a string with a minimum length of 10 characters"
      );
    }
  }

  // Validate 'score'
  if (data.score !== undefined) {
    if (
      isNaN(data.score) ||
      typeof data.score !== "number" ||
      data.score < 0 ||
      data.score > 5
    ) {
      errors.push("Score must be a numeric value between 0 and 5");
    }
  }

  return errors;
};

interface ParsedFileUrl {
  bucketName: BucketsS3;
  objectName: string;
}

export function parseFileUrl(fileUrl: string): ParsedFileUrl {
  const urlParts = fileUrl.split("/api/files/");

  if (urlParts.length !== 2) {
    throw new Error("Invalid file URL format");
  }

  const [bucketName, objectName] = urlParts[1].split("/");

  if (Object.values(BucketsS3).includes(bucketName as BucketsS3)) {
    return {
      bucketName: bucketName as BucketsS3,
      objectName,
    };
  }

  // Invalid bucket name
  throw new Error("Invalid bucket name in the file URL");
}
