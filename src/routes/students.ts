//   GET   /students
// Just an admin can get al the students

import { Router } from "express";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { Sex, UserRole } from "../const.js";
import { isValidToken } from "../middleware/jwt.js";
import { validateRequest } from "../middleware/validate.js";
import { StudentController } from "../controllers/index.js";
import { body, param } from "express-validator";
import { validateCi } from "../helpers/ci.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelStudent } from "../models/Student.js";
import { Schema, Types, isValidObjectId } from "mongoose";
//   GET   /student/project-tesis/:id
//   GET   /student/historial/:id
//   GET   /student/evaluation/:id
//   GET   /student/:id

export const router: Router = Router();

const authValidations = [isValidToken, protectRouteByRole([UserRole.Admin])];

const userValidations = [body("email").isString().isEmail()];

const studentValidations = [body("language_certificate").isBoolean()];

const personDataValidations = [
  body("ci").notEmpty(),
  body("name").trim().escape().notEmpty().isString(),
  body("lastname").trim().escape().notEmpty().isString(),
  body("phone").notEmpty().isNumeric().isLength({ min: 8, max: 8 }),
  body("sex").isIn(Object.values(Sex)),
  body("address").notEmpty().isString(),
];

const updateValidations = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail()
    .optional(),
  body("ci")
    .custom(validateCi)
    .withMessage("Invalid CI format")
    .trim()
    .escape()
    .optional(),
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .escape()
    .optional(),
  body("lastname")
    .isString()
    .withMessage("Last name must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 lenght")
    .escape()
    .optional(),

  body("address")
    .isString()
    .withMessage("Invalid address format")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Address must be at least 1 lenght")
    .escape()
    .optional(),
  body("sex")
    .isIn(Object.values(Sex))
    .withMessage("Invalid sex value")
    .optional(),
  body("phone")
    .isNumeric()
    .isLength({ min: 8, max: 8 })
    .withMessage("Phone must be a numeric string of 8 digits")
    .toInt()
    .optional(),
];

const validateIdParam = [
  param("id")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("id is required")
    .isMongoId()
    .withMessage("Invalid mongo id")
    .if((id) => isValidObjectId(id))
    .withMessage("Invalid mongo id")
    .custom((id) => isValidDoc(id, ModelStudent))
    .withMessage("Document not found")
    .customSanitizer((id) => new Types.ObjectId(id)),
];

router.post(
  "/",
  [
    // ...authValidations,
    ...userValidations,
    ...personDataValidations,
    ...studentValidations,
    // validateRequest,
  ],
  StudentController.createStudent
);
router.put(
  "/:id",
  [...validateIdParam, ...updateValidations, validateRequest],
  StudentController.updateStudent
);
type data = {
  email: string;
  ci: string;
  name: string;
  lastname: string;
  address: string;
  sex: Sex;
  phone: string;
};
