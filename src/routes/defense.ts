import express, { Request, Response, Router } from "express";
import { body, query } from "express-validator";
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
  body("keyWords")
    .customSanitizer((words) => JSON.parse(words))
    .isArray({ min: 1, max: 30 })
    .withMessage("keyWords must be an array with at least one element")
    .custom((words: Array<any>) => words.every((word) => word !== "")),

  body("recoms").isString().withMessage("Invalid recoms"),
  body("evaluation")
    .isNumeric()
    .isInt({ min: 2, max: 5 })
    .withMessage("Evaluation must be a number between 2 and 5")
    .customSanitizer((evalu) => Number(evalu)),
  body("court").isMongoId().withMessage("court must be a valid id"),
  body("project").isMongoId().withMessage("project must be a valid id"),
  body("date").isString().withMessage("Invalid date").toDate(),
];

// Route for creating a new defense record
router.post(
  "/",
  [
    // ...authValidations,
    multerMiddleware.fields([
      { name: "docFile", maxCount: 1 },
      { name: "presFile", maxCount: 1 },
      { name: "oponent_report", maxCount: 1 },
      { name: "tutor_opinion", maxCount: 1 },
    ]),
    ...createDefenseVlidations,
    validateRequest,
  ],
  DefenseController.createDefense
);

const searchValidations = [
  query("query")
    .exists({ values: "falsy" })
    .withMessage("The query must be defined in the url ?query= ")
    .isString()
    .withMessage("The query must be a string"),
];

// Route to search for al defenses
router.get(
  "/search",
  [...searchValidations, validateRequest],
  DefenseController.search
);
