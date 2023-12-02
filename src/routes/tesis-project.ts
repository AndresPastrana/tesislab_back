import express, { Router } from "express";
import { TesisProjectController } from "../controllers/index.js";
import { body, param, query } from "express-validator";
import { validateRequest } from "../middleware/validate.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelStudent } from "../models/Student.js";
import { ModelTesisProject } from "../models/TesisProject.js";
import { Types, isValidObjectId } from "mongoose";
import { ModelProfesor } from "../models/Profesor.js";
import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { UserRole } from "../const.js";

export const router: Router = express.Router();
const authValidations = [isValidToken, protectRouteByRole([UserRole.Admin])];

const createProjectValidations = [
  body("topic")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("topic is required")
    .isString()
    .withMessage("Topic must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("Topcic msut be between 10 and 200 characters")
    .toLowerCase(),
  body("general_target")
    .trim()
    .escape()
    .isString()
    .withMessage("genearl_target must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("genearl_target msut be between 10 and 200 characters")
    .toLowerCase(),
  body("scientific_problem")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("scientific_problem is required")
    .isString()
    .withMessage("scientific_problem must be a string")
    .isLength({ min: 20, max: 500 })
    .withMessage("scientific_problem msut be between 20 and 500 characters")
    .toLowerCase(),
  body("student")
    .optional()
    .isMongoId()
    .withMessage("Invalid id format")
    .if((id) => isValidObjectId(id))
    .custom((student_id) => isValidDoc(student_id, ModelStudent))
    .customSanitizer((student_id) => new Types.ObjectId(student_id))
    .custom(async (student_id) => {
      const st = await ModelTesisProject.findOne({ student: student_id });
      if (st) throw new Error("The student has asign another project");
      return true;
    }),
  body("tutors")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Tutors must be an array with 1 ore more element")
    .optional(),
  body("tutors.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid mongo id")
    .if((id) => isValidObjectId(id))
    .custom((tutor_id) => isValidDoc(tutor_id, ModelProfesor))
    .withMessage("Tutor not found")
    .customSanitizer((tutor_id) => new Types.ObjectId(tutor_id)),
];

const updateProjectValidations = [
  body("topic")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("topic is required")
    .isString()
    .withMessage("Topic must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("Topcic msut be between 10 and 200 characters")
    .toLowerCase()
    .optional(),
  body("general_target")
    .trim()
    .escape()
    .isString()
    .withMessage("genearl_target must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("genearl_target msut be between 10 and 200 characters")
    .toLowerCase()
    .optional(),
  body("scientific_problem")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("scientific_problem is required")
    .isString()
    .withMessage("scientific_problem must be a string")
    .isLength({ min: 20, max: 500 })
    .withMessage("scientific_problem msut be between 20 and 500 characters")
    .toLowerCase()
    .optional(),
  body("student")
    .optional()
    .isMongoId()
    .withMessage("Invalid id format")
    .if((id) => isValidObjectId(id))
    .custom((student_id) => isValidDoc(student_id, ModelStudent))
    .customSanitizer((student_id) => new Types.ObjectId(student_id))
    .custom(async (student_id) => {
      // TODO: Uncoment this later on
      // const st = await ModelTesisProject.findOne({ student: student_id });
      // if (st) throw new Error("The student has asign another project");
      return true;
    })
    .optional(),
  body("tutors")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Tutors must be an array with 1 ore more element")
    .optional(),
  body("tutors.*")
    .isMongoId()
    .withMessage("Invalid mongo id")
    .if((id) => isValidObjectId(id))
    .custom((tutor_id) => isValidDoc(tutor_id, ModelProfesor))
    .withMessage("Tutor not found")
    .customSanitizer((tutor_id) => new Types.ObjectId(tutor_id))
    .optional(),
];

// Validation middleware for project ID parameter
const validateProjectId = [
  param("id").isMongoId(), // Assuming MongoDB ObjectId, modify as needed
];

const validateGetParam = [
  param("old", "old must be a boolean value, exmaple: ?old=false")
    .isBoolean()
    .optional(),
];
// Create TesisProject
router.post(
  "/",
  [...authValidations, ...createProjectValidations, validateRequest],
  TesisProjectController.createTesisProject
);

// Edit TesisProject
router.put(
  "/:id",
  [
    ...authValidations,
    ...validateProjectId,
    ...updateProjectValidations,
    validateRequest,
  ],
  TesisProjectController.editTesisProject
);

// Close TesisProject
router.put(
  "/close/:id",
  [...authValidations, ...validateProjectId],
  TesisProjectController.closeTesisProject
);

// Get all tesis project

router.get("/", [...authValidations]);

// Get TesisProject Info
router.get(
  "/:id",
  [
    authValidations[0],
    protectRouteByRole([UserRole.Admin]),
    ...validateProjectId,
  ],
  TesisProjectController.getTesisProjectInfo
);

// Approve TesisProject
// TODO: validate that the profesor that is tryying to aprove this proyect thesis is a tutor of the project
router.put(
  "/approve/:id",
  [...authValidations, ...validateProjectId, validateRequest],
  TesisProjectController.approveTesisProject
);

// Update Functional Requirements
// TODO: validate that the syudent that is trying to update the fc is the student that belogns to this proyect
router.put(
  "/update-functional/:id",
  validateProjectId,
  body("functionalRequirements").isArray(),
  TesisProjectController.updateFunctionalRequirements
);

export default router;
