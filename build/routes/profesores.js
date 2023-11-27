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
import { UserRole } from "../const.js";
import { Types, isValidObjectId } from "mongoose";
import { isValidDoc } from "../middleware/dbValidators.js";
var authValidations = [
    isValidToken
];
var commonValidations = [
    body("name").isLength({
        min: 1,
        max: 100
    }).trim().escape(),
    body("lastname").isLength({
        min: 1,
        max: 100
    }).trim().escape(),
    body("address").isLength({
        min: 1
    }).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("phone").isLength({
        min: 8,
        max: 8
    }).trim().escape(),
    body("ci").isLength({
        min: 11,
        max: 11
    }).trim().escape(),
    body("sex").isIn([
        "Male",
        "Female"
    ]).trim().escape(),
    body("age").isInt({
        min: 16,
        max: 60
    }),
    body("academic_rank").isIn([
        "Rank1",
        "Rank2",
        "Rank3"
    ]).trim().escape(),
    body("*").trim().escape()
];
var createProfesorValidations = _to_consumable_array(authValidations).concat([
    protectRouteByRole([
        UserRole.Admin
    ])
], _to_consumable_array(commonValidations), [
    validateRequest
]);
var updateProfesorValidations = [
    param("id").isMongoId().withMessage("Invalid id format").if(function(id) {
        return isValidObjectId(id);
    }).customSanitizer(function(id) {
        return new Types.ObjectId(id);
    }).custom(function(id) {
        return isValidDoc(id);
    }).withMessage("Document not found")
].concat(_to_consumable_array(commonValidations));
export var router = Router();
router.post("/profesores", _to_consumable_array(createProfesorValidations), ProfesorController.createProfesor);
router.get("/", ProfesorController.getProfesores);
router.get("/:id", [
    param("id").isMongoId()
], ProfesorController.getProfesorById);
router.put("/:id", updateProfesorValidations, ProfesorController.updateProfesor);
router.delete("/:id", [
    param("id").isMongoId()
], ProfesorController.deleteProfesor);
