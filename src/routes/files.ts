import express, { Router } from "express";
import { FilesController } from "../controllers/files.js"; // Update the path accordingly
import { BucketsS3 } from "../const.js";
import { validateRequest } from "../middleware/validate.js";
import { param } from "express-validator";
import { Types, isValidObjectId } from "mongoose";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelDefense } from "../models/Defensa.js";
export const router: Router = express.Router();

const validations = [
  //   isValidToken,
  //   protectRouteByRole(Object.values(UserRole)),
  param("bucket")
    .isIn(Object.values(BucketsS3))
    .withMessage("Invalid bucket name"),
  param("filename").isString().withMessage("Invalid filename"),
  validateRequest,
];

router.get(
  "/shared/:id",
  [
    param("id").isMongoId(),
    param("id").custom((id) => isValidDoc(id, ModelDefense)),
    param("id")
      .if((id) => isValidObjectId(id))
      .customSanitizer((id) => new Types.ObjectId(id)),
    validateRequest,
  ],
  FilesController.getRarTesisInfo
);

// Define a route to get a file
router.get("/:bucket/:filename", [...validations], FilesController.getFile);
