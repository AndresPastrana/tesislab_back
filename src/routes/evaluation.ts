import express, { NextFunction, Request, Response, Router } from "express";
import { body, param, query } from "express-validator";
import { EvaluationController } from "../controllers/evaluation.js";
import { EvalStatus, EvalType, UserRole } from "../const.js";
import { validateRequest } from "../middleware/validate.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { isValidToken } from "../middleware/jwt.js";
import { multerMiddleware } from "../middleware/multer.js";

export const router: Router = express.Router();

const authValidations = [
  isValidToken,
  protectRouteByRole([UserRole.Admin, UserRole.Student]),
];

// Validation middleware for creating a new evaluation
const createEvaluationValidation = [
  body("type")
    .isIn(Object.values(EvalType))
    .withMessage(
      `Invalid evaluation type, try with one of ${Object.values(EvalType)} `
    ),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  body("endDate")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format for endDate"),
];

// Validation middleware for getting submissions by evaluation ID
const getSubmissionsByEvaluationIdValidation = [
  param("id").isMongoId().withMessage("Evaluation ID format not valid"),
];

// Validation middleware for editing an existing evaluation
const editEvaluationValidation = [
  param("evaluationId").isMongoId().withMessage("Evaluation ID is invalid"),
  body("type")
    .optional()
    .isIn(Object.values(EvalType))
    .withMessage("Invalid evaluation type"),
  body("status")
    .optional()
    .isIn(Object.values(EvalStatus))
    .withMessage(`Invalid status, try one of: ${Object.values(EvalStatus)}`),
  body("description").optional().isString().withMessage("Invalid description"),
  body("endDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format for endDate"),
];

// Validation middleware for getting submissions by student ID
const getSubmissionsByStudentIdValidation = [
  query("studentId")
    .isString()
    .notEmpty()
    .withMessage("Student ID is required"),
];

const createSubmissionValidations = [
  body("evaluation_id").isMongoId().withMessage("Invalid evaluationId format"),
  body("student_id").isMongoId().withMessage("Invalid studentId format"),
];
// Routes
router.post(
  "/",
  [...authValidations, ...createEvaluationValidation, validateRequest],
  EvaluationController.createEvaluation
);

router.get(
  "/:id/submissions",
  [
    ...authValidations,
    ...getSubmissionsByEvaluationIdValidation,
    validateRequest,
  ],
  EvaluationController.getAllSubmissionsByEvaluationId
);

router.post(
  "/submissions",
  [
    ...authValidations,
    // ...createSubmissionValidations,
    multerMiddleware.single("form_file"),
    // validateRequest,
  ],

  EvaluationController.createSubmission
);

router.put(
  "/submissions/:id",
  [...authValidations, validateRequest],

  EvaluationController.editSubmission
);

router.put(
  "/:evaluationId",
  [...authValidations, ...editEvaluationValidation, validateRequest],
  EvaluationController.editEvaluation
);

router.get(
  "/:eval_id/student_submissions/:student_id",
  [...getSubmissionsByStudentIdValidation],
  EvaluationController.getStudentSubmission
);

router.get(
  "/",
  [...authValidations, validateRequest],
  EvaluationController.getAllEvaluations
);

router.get(
  "/submissions/:student_id",
  [param("student_id").isMongoId().withMessage("Inavlid id")],
  EvaluationController.getAllEvaluationsWithSub
);
