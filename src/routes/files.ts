import express, { Router } from "express";
import { FilesController } from "../controllers/files.js"; // Update the path accordingly
import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { BucketsS3 } from "../const.js";
import { param } from "express-validator";
import { validateRequest } from "../middleware/validate.js";

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

// Define a route to get a file
router.get("/:bucket/:filename", [...validations], FilesController.getFile);
