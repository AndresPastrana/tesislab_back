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
import { Types, isValidObjectId } from "mongoose";
import { ModelUser } from "../models/User.js";

//   GET   /student/project-tesis/:id
//   GET   /student/historial/:id
//   GET   /student/evaluations/
//   GET   /student/evaluations/:id
//   GET   /student/:id

export const router: Router = Router();

const authValidations = [isValidToken, protectRouteByRole([UserRole.Admin])];

// TODO: Validate that ci can not be repeated in create and update
const createStudentValidations = [
  body("ci")
    .isLength({ min: 11, max: 11 })
    .isNumeric()
    .custom((ci) => {
      if (validateCi(ci)) {
        return true;
      }
      throw new Error("Invalid ci");
    }),
  body("name").trim().escape().notEmpty().isString().toLowerCase(),
  body("lastname").trim().escape().notEmpty().isString().toLowerCase(),
  body("phone").notEmpty().isNumeric().isLength({ min: 8, max: 8 }),
  body("sex").trim().escape().toLowerCase().isIn(Object.values(Sex)),
  body("address").trim().escape().notEmpty().isString(),
  body("language_certificate").isBoolean(),
  body("email").trim().escape().isString().isEmail().normalizeEmail(),
  body("role").trim().escape().toLowerCase().isIn(Object.values(UserRole)),
];

const updateValidations = [
  body("user_id")
    .exists({ values: "falsy" })
    .withMessage("user_id is required")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom(async (id) => await isValidDoc(id, ModelUser)),
  body("ci")
    .isLength({ min: 11, max: 11 })
    .withMessage("CI must be 11 length")
    .isNumeric()
    .withMessage("CI must be 11 length")
    .custom((ci) => {
      if (validateCi(ci)) {
        return true;
      }
      throw new Error("Invalid ci");
    })
    .optional(),
  body("name").trim().escape().notEmpty().isString().toLowerCase().optional(),
  body("lastname")
    .trim()
    .escape()
    .notEmpty()
    .isString()
    .toLowerCase()
    .optional(),
  body("phone").notEmpty().isNumeric().isLength({ min: 8, max: 8 }).optional(),
  body("sex").trim().escape().toLowerCase().isIn(Object.values(Sex)).optional(),
  body("address").trim().escape().notEmpty().isString().optional(),
  body("language_certificate").isBoolean().optional(),
  body("email")
    .trim()
    .escape()
    .isString()
    .isEmail()
    .normalizeEmail()
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
    .custom(async (id) => {
      const is = await isValidDoc(id, ModelStudent);

      if (is) {
        return true;
      }
      throw new Error("Student not found");
    })
    .withMessage("Student not found")
    .customSanitizer((id) => new Types.ObjectId(id)),
];

router.post(
  "/",
  [...createStudentValidations, validateRequest],
  StudentController.createStudent
);
router.put(
  "/:id",
  [...validateIdParam, ...updateValidations, validateRequest],
  StudentController.updateStudent
);

router.delete("/:id", [...validateIdParam], StudentController.deleteStudent);

router.get("/:id", [...validateIdParam], StudentController.getStudentById);
type data = {
  email: string;
  ci: string;
  name: string;
  lastname: string;
  address: string;
  sex: Sex;
  phone: string;
};
