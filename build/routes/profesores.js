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
export var router = Router();
var authValidations = [
    isValidToken,
    protectRouteByRole([
        UserRole.Admin
    ])
];
var createProfesorValidations = [
    body("ci").isLength({
        min: 11,
        max: 11
    }).isNumeric().custom(function(ci) {
        if (validateCi(ci)) {
            return true;
        }
        throw new Error("Invalid ci");
    }),
    body("name").trim().escape().exists({
        values: "falsy"
    }).withMessage("name is required").toLowerCase().isString().withMessage("name must be a string").isLength({
        min: 1,
        max: 50
    }).withMessage("name must have a max of 50  characters"),
    body("lastname").trim().escape().exists({
        values: "falsy"
    }).withMessage("lastname is required").toLowerCase().isString().withMessage("lastname must be a string").isLength({
        min: 1,
        max: 50
    }).withMessage("lastname must have a max of 50  characters"),
    body("address").trim().escape().exists({
        values: "falsy"
    }).withMessage("address is required").toLowerCase().isString().withMessage("address must be a string").isLength({
        min: 1,
        max: 100
    }).withMessage("address must have a max of 100  characters"),
    body("email").trim().escape().exists({
        values: "falsy"
    }).withMessage("email is required").isEmail().withMessage("invalid email format").normalizeEmail(),
    body("phone").isNumeric().withMessage("phone must be an string number").isLength({
        min: 8,
        max: 8
    }).withMessage("phone must 8 characters lenght"),
    body("sex").isIn(Object.values(Sex)),
    body("academic_rank").isIn(Object.values(RangoAcademico))
];
var updateProfesorValidation = [
    body("ci").optional().isLength({
        min: 11,
        max: 11
    }).isNumeric().custom(function(ci) {
        if (validateCi(ci)) {
            return true;
        }
        throw new Error("Invalid ci");
    }),
    body("name").optional().trim().escape().exists({
        values: "falsy"
    }).withMessage("name is required").toLowerCase().isString().withMessage("name must be a string").isLength({
        min: 1,
        max: 50
    }).withMessage("name must have a max of 50  characters"),
    body("lastname").optional().trim().escape().exists({
        values: "falsy"
    }).withMessage("lastname is required").toLowerCase().isString().withMessage("lastname must be a string").isLength({
        min: 1,
        max: 50
    }).withMessage("lastname must have a max of 50  characters"),
    body("address").optional().trim().escape().exists({
        values: "falsy"
    }).withMessage("address is required").toLowerCase().isString().withMessage("address must be a string").isLength({
        min: 1,
        max: 100
    }).withMessage("address must have a max of 100  characters"),
    body("email").optional().trim().escape().exists({
        values: "falsy"
    }).withMessage("email is required").isEmail().withMessage("invalid email format").normalizeEmail(),
    body("phone").optional().isNumeric().withMessage("phone must be an string number").isLength({
        min: 8,
        max: 8
    }).withMessage("phone must 8 characters lenght"),
    body("sex").optional().isIn(Object.values(Sex)),
    body("academic_rank").optional().isIn(Object.values(RangoAcademico)),
    body("user_id").isMongoId().customSanitizer(function(id) {
        return new Types.ObjectId(id);
    })
];
var validateIdParam = [
    param("id").isMongoId().withMessage("Invalid id format").if(function(id) {
        return isValidObjectId(id);
    }).customSanitizer(function(id) {
        return new Types.ObjectId(id);
    }).custom(function(id) {
        return isValidDoc(id, ModelProfesor);
    }).withMessage("Document not found")
];
// Private routes
// Role: admin
router.post("/", _to_consumable_array(createProfesorValidations).concat([
    validateRequest
]), ProfesorController.createProfesor);
router.get("/", _to_consumable_array(authValidations), ProfesorController.getProfesores);
router.put("/:id", _to_consumable_array(authValidations).concat(_to_consumable_array(validateIdParam), _to_consumable_array(updateProfesorValidation), [
    validateRequest
]), ProfesorController.updateProfesor);
router.delete("/:id", _to_consumable_array(authValidations).concat([
    param("id").isMongoId()
]), ProfesorController.deleteProfesor);
router.get("/info", [
    isValidToken,
    validateRequest
], ProfesorController.getCourtByProfessorId);
router.get("/stats", [
    isValidToken,
    validateRequest
], ProfesorController.obtenerProyectosYAprobadosPorProfesor);
router.get("/:id", [
    authValidations[0],
    protectRouteByRole([
        UserRole.Admin,
        UserRole.Profesor
    ]),
    param("id").isMongoId(),
    validateRequest
], ProfesorController.getProfesorById);
