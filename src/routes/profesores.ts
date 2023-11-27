import { Router } from "express";
import { body, param } from "express-validator";
import { ProfesorController } from "../controllers/index.js";
import { validateRequest } from "../middleware/validate.js";
import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { UserRole } from "../const.js";
import { Types, isValidObjectId } from "mongoose";
import { isValidDoc } from "../middleware/dbValidators.js";

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
  body("*").trim().escape(),
];

const createProfesorValidations = [
  ...authValidations,
  protectRouteByRole([UserRole.Admin]),
  ...commonValidations,
  validateRequest,
];

const updateProfesorValidations = [
  param("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .if((id) => isValidObjectId(id))
    .customSanitizer((id) => new Types.ObjectId(id))
    .custom((id) => isValidDoc(id))
    .withMessage("Document not found"),
  ...commonValidations,

  // Agregar validaciones específicas para la actualización de profesores si es necesario
];

export const router: Router = Router();

router.post(
  "/profesores",
  [...createProfesorValidations],
  ProfesorController.createProfesor
);

router.get("/", ProfesorController.getProfesores);

router.get(
  "/:id",
  [param("id").isMongoId()],
  ProfesorController.getProfesorById
);

router.put(
  "/:id",
  updateProfesorValidations,
  ProfesorController.updateProfesor
);

router.delete(
  "/:id",
  [param("id").isMongoId()],
  ProfesorController.deleteProfesor
);
