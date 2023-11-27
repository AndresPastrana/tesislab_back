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
import ControllerStudent from "../controllers/student.js";
import { body } from "express-validator";
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
router.post("/create", // ...authValidations,
_to_consumable_array(userValidations).concat(_to_consumable_array(personDataValidations), _to_consumable_array(studentValidations)), ControllerStudent.createStudent); // Create student controller
 // Recives all the user info data
 // Recives all the person data,
 // Recives the student specific data
 // Register the new User
 // Creates the new Person
 // Create the new Student
