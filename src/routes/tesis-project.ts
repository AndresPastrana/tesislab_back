import express, { Router } from "express";
import { TesisProjectController } from "../controllers/index.js";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validate.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelStudent } from "../models/Student.js";
import { ModelTesisProject } from "../models/TesisProject.js";
import { Types, isValidObjectId } from "mongoose";
import { ModelProfesor } from "../models/Profesor.js";

export const router: Router = express.Router();

// TODO: Otional
//  [done] Validate that the student exist in the Student model
// Validate that there is no other project tesis with this student

// Validate that teh tutors exist and they are not ancient
const createProjectValidations = [
  body("topic")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("general_target is required")
    .isString()
    .withMessage("Topic must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("Topcic msut be between 10 and 200 characters")
    .toLowerCase(),
  body("general_target")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("general_target is required")
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

// Validation middleware for project ID parameter
const validateProjectId = [
  param("id").isMongoId(), // Assuming MongoDB ObjectId, modify as needed
];

// Create TesisProject
router.post(
  "/",
  [...createProjectValidations, validateRequest],
  TesisProjectController.createTesisProject
);

// Edit TesisProject
router.put(
  "/:id",
  validateProjectId,
  createProjectValidations,
  TesisProjectController.editTesisProject
);

// Close TesisProject
router.put(
  "/close/:id",
  validateProjectId,
  TesisProjectController.closeTesisProject
);

// Get TesisProject Info
router.get(
  "/:id",
  validateProjectId,
  TesisProjectController.getTesisProjectInfo
);

// Approve TesisProject
router.put(
  "/approve/:id",
  validateProjectId,
  TesisProjectController.approveTesisProject
);

// Update Functional Requirements
router.put(
  "/update-functional/:id",
  validateProjectId,
  body("functionalRequirements").isArray(),
  TesisProjectController.updateFunctionalRequirements
);

export default router;
