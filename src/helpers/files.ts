import { Express } from "express";
import { randomUUID } from "crypto";

export const getFileExtension = (file: Express.Multer.File) => {
  if (!file) {
    throw new Error("Invalid function params");
  }
  const fileExtension = (file.mimetype || "").split("/").pop();
  return fileExtension;
};

export const getUniqueFileName = (file: Express.Multer.File) => {
  if (!file) {
    throw new Error("Invalid function params");
  }

  // Generate a unique filename using randomUUID and the original file extension
  const fileExtension = getFileExtension(file);

  if (!fileExtension) {
    throw new Error("Invalid file extension");
  }

  const uniqueFileName = `${randomUUID()}.${fileExtension}`;
  return uniqueFileName;
};
export const isValidFile = (
  extensions: string[],
  file: Express.Multer.File
): boolean => {
  if (!file) {
    throw new Error("Invalid function params");
  }

  const fileExtension = getFileExtension(file);

  if (!fileExtension) {
    throw new Error("Invalid file extension");
  }

  return extensions.includes(fileExtension.toLowerCase());
};
