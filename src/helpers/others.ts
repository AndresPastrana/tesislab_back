import path from "node:path";
import { AppTypeKeywords } from "../../types.js";
import { AppTypes, BucketsS3 } from "../const.js";
import { SubmissionType } from "../models/Submission.js";
import fs from "node:fs";

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

export function readAppTypeKeywords(appType: AppTypes): string[] | null {
  try {
    // const filePath = path.join("../data/");
    const fileBuffer = fs.readFileSync("./src/data/keywords.json", {
      encoding: "utf8",
    });

    const appTypeKeywords = JSON.parse(fileBuffer.toString());
    return appTypeKeywords[appType] || null;
  } catch (error) {
    const err = error as Error;
    console.error("Error reading appTypeKeywords.json:", err.message);
    return null;
  }
}
