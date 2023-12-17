import express, { Router } from "express";
import { body, validationResult } from "express-validator";
import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { UserRole } from "../const.js";
import { DefenseController } from "../controllers/defense.js";
import { validateRequest } from "../middleware/validate.js";
import { multerMiddleware } from "../middleware/multer.js";

export const router: Router = express.Router();

// Validation middleware
const authValidations = [isValidToken, protectRouteByRole([UserRole.Admin])];
const createDefenseVlidations = [
  body("studentId").isMongoId().withMessage("Invalid studentId"),
  body("key_words")
    .isArray({ min: 1 })
    .custom((value: string[]) =>
      value.every((word) => typeof word === "string" && word.trim() !== "")
    )
    .withMessage("key_words must be a non-empty array of strings"),
  body("recoms").isString().withMessage("Invalid recoms"),
  body("evaluation")
    .isNumeric()
    .isInt({ min: 2, max: 5 })
    .withMessage("Evaluation must be a number between 2 and 5"),
  body("court").isArray().withMessage("court must be an array"),
];

// Route for creating a new defense record
router.post(
  "/",
  [
    // ...authValidations,
    // ...createDefenseVlidations,
    // validateRequest,
    multerMiddleware.fields([
      { name: "docFile", maxCount: 1 },
      { name: "presFile", maxCount: 1 },
    ]),
  ],
  DefenseController.createDefense
);
