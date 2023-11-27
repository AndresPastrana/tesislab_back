//   GET   /students
// Just an admin can get al the students
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
//   GET   /student/project-tesis/:id
//   GET   /student/historial/:id
//   GET   /student/evaluation/:id
//   GET   /student/:id
export var router = Router();
var authValidations = [
    isValidToken,
    protectRouteByRole([
        UserRole.Admin
    ])
];
var userValidations = [
    body("email").isString().isEmail()
];
var studentValidations = [
    body("language_certificate").isBoolean()
];
var personDataValidations = [
    body("ci").notEmpty(),
    body("name").trim().escape().notEmpty().isString(),
    body("lastname").trim().escape().notEmpty().isString(),
    body("phone").notEmpty().isNumeric().isLength({
        min: 8,
        max: 8
    }),
    body("sex").isIn(Object.values(Sex)),
    body("address").notEmpty().isString()
];
var updateValidations = [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail().optional(),
    body("ci").custom(validateCi).withMessage("Invalid CI format").trim().escape().optional(),
    body("name").isString().withMessage("Name must be a string").trim().escape().optional(),
    body("lastname").isString().withMessage("Last name must be a string").trim().isLength({
        min: 1
    }).withMessage("Name must be at least 1 lenght").escape().optional(),
    body("address").isString().withMessage("Invalid address format").trim().isLength({
        min: 1
    }).withMessage("Address must be at least 1 lenght").escape().optional(),
    body("sex").isIn(Object.values(Sex)).withMessage("Invalid sex value").optional(),
    body("phone").isNumeric().isLength({
        min: 8,
        max: 8
    }).withMessage("Phone must be a numeric string of 8 digits").toInt().optional()
];
var validateIdParam = [
    param("id").trim().escape().exists({
        values: "falsy"
    }).withMessage("id is required").isMongoId().withMessage("Invalid mongo id").if(function(id) {
        return isValidObjectId(id);
    }).withMessage("Invalid mongo id").custom(function(id) {
        return isValidDoc(id, ModelStudent);
    }).withMessage("Document not found").customSanitizer(function(id) {
        return new Types.ObjectId(id);
    })
];
router.post("/", // ...authValidations,
_to_consumable_array(userValidations).concat(_to_consumable_array(personDataValidations), _to_consumable_array(studentValidations)), StudentController.createStudent);
router.put("/:id", _to_consumable_array(validateIdParam).concat(_to_consumable_array(updateValidations), [
    validateRequest
]), StudentController.updateStudent);
