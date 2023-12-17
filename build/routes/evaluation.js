function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import express from "express";
import { body, param, query } from "express-validator";
import { EvaluationController } from "../controllers/evaluation.js";
import { EvalStatus, EvalType, UserRole } from "../const.js";
import { validateRequest } from "../middleware/validate.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { isValidToken } from "../middleware/jwt.js";
import { multerMiddleware } from "../middleware/multer.js";
export var router = express.Router();
var authValidations = [
    isValidToken,
    protectRouteByRole([
        UserRole.Admin,
        UserRole.Student
    ])
];
// Validation middleware for creating a new evaluation
var createEvaluationValidation = [
    body("type").isIn(Object.values(EvalType)).withMessage("Invalid evaluation type, try with one of ".concat(Object.values(EvalType), " ")),
    body("description").isString().notEmpty().withMessage("Description is required"),
    body("endDate").isISO8601().toDate().withMessage("Invalid date format for endDate")
];
// Validation middleware for getting submissions by evaluation ID
var getSubmissionsByEvaluationIdValidation = [
    param("id").isMongoId().withMessage("Evaluation ID format not valid")
];
// Validation middleware for editing an existing evaluation
var editEvaluationValidation = [
    param("evaluationId").isMongoId().withMessage("Evaluation ID is invalid"),
    body("type").optional().isIn(Object.values(EvalType)).withMessage("Invalid evaluation type"),
    body("status").optional().isIn(Object.values(EvalStatus)).withMessage("Invalid status, try one of: ".concat(Object.values(EvalStatus))),
    body("description").optional().isString().withMessage("Invalid description"),
    body("endDate").optional().isISO8601().toDate().withMessage("Invalid date format for endDate")
];
// Validation middleware for getting submissions by student ID
var getSubmissionsByStudentIdValidation = [
    query("studentId").isString().notEmpty().withMessage("Student ID is required")
];
var createSubmissionValidations = [
    body("evaluation_id").isMongoId().withMessage("Invalid evaluationId format"),
    body("student_id").isMongoId().withMessage("Invalid studentId format")
];
// Routes
router.post("/", _to_consumable_array(authValidations).concat(_to_consumable_array(createEvaluationValidation), [
    validateRequest
]), EvaluationController.createEvaluation);
router.get("/:id/submissions", _to_consumable_array(authValidations).concat(_to_consumable_array(getSubmissionsByEvaluationIdValidation), [
    validateRequest
]), EvaluationController.getAllSubmissionsByEvaluationId);
router.post("/submissions", _to_consumable_array(authValidations).concat([
    // ...createSubmissionValidations,
    multerMiddleware.single("form_file")
]), EvaluationController.createSubmission);
router.put("/submissions/:id", _to_consumable_array(authValidations).concat([
    validateRequest
]), EvaluationController.editSubmission);
router.put("/:evaluationId", _to_consumable_array(authValidations).concat(_to_consumable_array(editEvaluationValidation), [
    validateRequest
]), EvaluationController.editEvaluation);
router.get("/:eval_id/student_submissions/:student_id", _to_consumable_array(getSubmissionsByStudentIdValidation), EvaluationController.getStudentSubmission);
router.get("/", _to_consumable_array(authValidations).concat([
    validateRequest
]), EvaluationController.getAllEvaluations);
router.get("/submissions/:student_id", [
    param("student_id").isMongoId().withMessage("Inavlid id")
], EvaluationController.getAllEvaluationsWithSub);
