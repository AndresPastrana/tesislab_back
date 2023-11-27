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
import { body, param, query } from "express-validator";
import { isValidObjectId, Types } from "mongoose";
import { UserRole } from "../const.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { ModelDepartament, ModelUser } from "../models/index.js";
import { UserController } from "./../controllers/index.js";
import { isValidDoc, isValidToken, validateRequest } from "./../middleware/index.js";
// TODO:
// Solamnte se pueden insertar usarios con el role HEAD of Department for the demo porpuse
export var router = Router();
var authValidatonMiddlewares = [
    isValidToken,
    protectRouteByRole([
        UserRole.SPECIALIST
    ])
];
// Validation and sanitization middleware for createUser
var createUserValidationMiddleware = [
    body("username").exists().withMessage("username is required").isString().withMessage("username must be a string").trim().notEmpty().withMessage("username not must be empty").escape(),
    body("password").exists().isString().trim().notEmpty().withMessage("Password not must be empty").isStrongPassword().withMessage("Weak password").escape(),
    body("email").exists().isEmail().normalizeEmail().withMessage("Invalid email address").escape(),
    body("firstName").exists().withMessage("firstName is required").isString().withMessage("firstName must be a string").trim().notEmpty().withMessage("firstName not must be empty").escape(),
    body("lastName").exists().withMessage("lastName is required").trim().isString().withMessage("lastName must be a string").notEmpty().withMessage("lastName not must be empty").escape(),
    body("role").exists({
        values: "null"
    }).withMessage("role is required").trim().isString().withMessage("role is must be a string").isIn([
        UserRole.HEAD_OF_DEPARTMENT
    ]) // We just can insert HEAD_OF_DEPARTMENT users by now
    .withMessage("invalid role").notEmpty().withMessage("role is required").escape(),
    body("departament").exists({
        values: "null"
    }).withMessage("departament is required").escape().trim().isMongoId().withMessage("Invalid departament ID").if(function(id) {
        return isValidObjectId(id);
    }).custom(function(id) {
        return isValidDoc(id, ModelDepartament);
    }).customSanitizer(function(id) {
        return new Types.ObjectId(id);
    })
];
var paramIdValidationMiddleware = [
    param("id").exists({
        values: "null"
    }).withMessage("id is required").trim().escape().isMongoId().withMessage("invalid id").if(function(id) {
        return isValidObjectId(id);
    }).custom(function(id) {
        return isValidDoc(id, ModelUser);
    }).customSanitizer(function(value) {
        return new Types.ObjectId(value);
    })
];
// Validation middleware for getUsersByRole
var getUsersByRoleValidationMiddleware = [
    query("role").exists({
        values: "null"
    }).withMessage("Role is required").trim().escape().isString().withMessage("Role must be a string").notEmpty().withMessage("Role must not be an empty string").isIn([
        UserRole.HEAD_OF_DEPARTMENT
    ]) // Just alloe the get all the HEADS of departament
    .withMessage("Unsuported role")
];
// Define the routes with their respective validation middleware
router.post("/create", _to_consumable_array(authValidatonMiddlewares).concat(_to_consumable_array(createUserValidationMiddleware), [
    validateRequest
]), UserController.createUser);
router.get("/by-role", _to_consumable_array(authValidatonMiddlewares).concat(_to_consumable_array(getUsersByRoleValidationMiddleware), [
    validateRequest
]), UserController.getUsersByRole);
router.get("/:id", [
    authValidatonMiddlewares[0],
    protectRouteByRole(Object.values(UserRole))
].concat(_to_consumable_array(paramIdValidationMiddleware), [
    validateRequest
]), UserController.getUserById);
router.put("/:id", _to_consumable_array(authValidatonMiddlewares).concat(_to_consumable_array(paramIdValidationMiddleware), _to_consumable_array(createUserValidationMiddleware)), UserController.updateUserById);
router.delete("/:id", _to_consumable_array(authValidatonMiddlewares).concat(_to_consumable_array(paramIdValidationMiddleware), [
    validateRequest
]), UserController.deleteUserById);
export default router;
