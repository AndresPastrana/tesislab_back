import { Router } from "express";
import { body, param } from "express-validator";
import { ProfesorController } from "../controllers/index.js";
import { validateRequest } from "../middleware/validate.js";
import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { RangoAcademico, Sex, UserRole } from "../const.js";
import { Types, isValidObjectId } from "mongoose";
import { isValidDoc } from "../middleware/dbValidators.js";
import { validateCi } from "../helpers/ci.js";
import { ModelProfesor } from "../models/Profesor.js";
export const router: Router = Router();

const authValidations = [isValidToken];
const commonValidations = [
  body("name").isLength({ min: 1, max: 100 }).trim().escape(),
  body("lastname").isLength({ min: 1, max: 100 }).trim().escape(),
  body("address").isLength({ min: 1 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("phone").isLength({ min: 8, max: 8 }).trim().escape(),
  body("ci").isLength({ min: 11, max: 11 }).trim().escape(),
  body("sex").isIn(["Male", "Female"]).trim().escape(),
  body("age").isInt({ min: 16, max: 60 }),
  body("academic_rank").isIn(["Rank1", "Rank2", "Rank3"]).trim().escape(),
];

const createProfesorValidations = [
  body("ci")
    .isLength({ min: 11, max: 11 })
    .isNumeric()
    .custom((ci) => {
      if (validateCi(ci)) {
        return true;
      }
      throw new Error("Invalid ci");
    }),

  body("name")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("name is required")
    .toLowerCase()
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("name must have a max of 50  characters"),

  body("lastname")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("lastname is required")
    .toLowerCase()
    .isString()
    .withMessage("lastname must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("lastname must have a max of 50  characters"),

  body("address")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("address is required")
    .toLowerCase()
    .isString()
    .withMessage("address must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("address must have a max of 100  characters"),

  body("email")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .normalizeEmail(),

  body("phone")
    .isNumeric()
    .withMessage("phone must be an string number")
    .isLength({ min: 8, max: 8 })
    .withMessage("phone must 8 characters lenght"),

  body("sex").isIn(Object.values(Sex)),
  body("academic_rank").isIn(Object.values(RangoAcademico)),
];
const updateProfesorValidation = [
  body("ci")
    .optional()
    .isLength({ min: 11, max: 11 })
    .isNumeric()
    .custom((ci) => {
      if (validateCi(ci)) {
        return true;
      }
      throw new Error("Invalid ci");
    }),

  body("name")
    .optional()
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("name is required")
    .toLowerCase()
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("name must have a max of 50  characters"),

  body("lastname")
    .optional()
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("lastname is required")
    .toLowerCase()
    .isString()
    .withMessage("lastname must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("lastname must have a max of 50  characters"),

  body("address")
    .optional()
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("address is required")
    .toLowerCase()
    .isString()
    .withMessage("address must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("address must have a max of 100  characters"),

  body("email")
    .optional()
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .normalizeEmail(),

  body("phone")
    .optional()
    .isNumeric()
    .withMessage("phone must be an string number")
    .isLength({ min: 8, max: 8 })
    .withMessage("phone must 8 characters lenght"),

  body("sex").optional().isIn(Object.values(Sex)),
  body("academic_rank").optional().isIn(Object.values(RangoAcademico)),
];
const validateIdParam = [
  param("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .if((id) => isValidObjectId(id))
    .customSanitizer((id) => new Types.ObjectId(id))
    .custom((id) => isValidDoc(id, ModelProfesor))
    .withMessage("Document not found"),

  // Agregar validaciones específicas para la actualización de profesores si es necesario
];

// Private routes
// Role: admin
router.post(
  "/",
  [...createProfesorValidations, validateRequest],
  ProfesorController.createProfesor
);
router.get("/", ProfesorController.getProfesores);

router.put(
  "/:id",
  [...validateIdParam, ...updateProfesorValidation, validateRequest],

  ProfesorController.updateProfesor
);

router.delete(
  "/:id",
  [param("id").isMongoId()],
  ProfesorController.deleteProfesor
);

//Role: admin and profesor if its himself
router.get(
  "/:id",
  [param("id").isMongoId(), validateRequest],
  ProfesorController.getProfesorById
);
