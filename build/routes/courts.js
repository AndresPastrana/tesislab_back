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
import { CourtsController } from "../controllers/courts.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelCourt } from "../models/Court.js";
import { validateRequest } from "../middleware/validate.js";
import { CourtRole, UserRole } from "../const.js";
import { ModelProfesor } from "../models/Profesor.js";
import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
export var router = Router();
var authValidations = [
    isValidToken,
    protectRouteByRole([
        UserRole.Admin
    ])
];
var validateCreateCourt = [
    body("name").trim().escape().isString().withMessage("Name should be a string").isLength({
        min: 1
    }).withMessage("Name is required"),
    body("members").isArray({
        min: Object.values(CourtRole).length
    }).withMessage("The courts needs to have a least ".concat(Object.values(CourtRole).length, " members: ").concat(Object.values(CourtRole).join(", "), " ")),
    body("members.*.profesor").exists({
        values: "falsy"
    }).withMessage("profesor id is required").isMongoId().withMessage("invalid id format").custom(function(profesorId) {
        return isValidDoc(profesorId, ModelProfesor);
    }).withMessage("Profesor not found"),
    body("members.*.role").exists({
        values: "falsy"
    }).withMessage("role is required").isIn(Object.values(CourtRole)).withMessage("Invalid role"),
    body("members").if(function(members) {
        return members.length === 4;
    }).custom(function(members) {
        var rolesSet = new Set();
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = members[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var member = _step.value;
                if (rolesSet.has(member.role)) {
                    // Role is repeated, return false
                    return false;
                }
                rolesSet.add(member.role);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return true;
    }).withMessage("Roles can not be repeated in the court")
];
var validateUpdateCourt = [
    param("courtId").isMongoId().withMessage("Invalid Court ID"),
    body("name").optional().trim().isLength({
        min: 1
    }).withMessage("Name must be at least 1 character")
];
var validateCourtId = [
    param("id").exists({
        values: "falsy"
    }).withMessage("id is required in the params").isMongoId().withMessage("Invalid id format").custom(function(courtId) {
        return isValidDoc(courtId, ModelCourt);
    }).withMessage("Court not found ")
];
// Routes
router.post("/", _to_consumable_array(authValidations).concat(_to_consumable_array(validateCreateCourt), [
    validateRequest
]), CourtsController.createCourt);
router.put("/:courtId", _to_consumable_array(authValidations).concat(_to_consumable_array(validateCourtId), _to_consumable_array(validateUpdateCourt)), CourtsController.updateCourt);
router.get("/", _to_consumable_array(authValidations).concat([
    validateRequest
]), CourtsController.getAllCourts);
router.get("/:courtId", [
    authValidations[0],
    protectRouteByRole([
        UserRole.Profesor,
        UserRole.Admin
    ])
].concat(_to_consumable_array(validateCourtId)), CourtsController.getCourtById);
//TODO: Validate that te court exist
router.delete("/:courtId", param("courtId").isMongoId().withMessage("Invalid Court ID"), CourtsController.deleteCourt);
