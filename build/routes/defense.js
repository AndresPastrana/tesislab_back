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
import { body, query } from "express-validator";
import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { UserRole } from "../const.js";
import { DefenseController } from "../controllers/defense.js";
import { validateRequest } from "../middleware/validate.js";
import { multerMiddleware } from "../middleware/multer.js";
export var router = express.Router();
// Validation middleware
var authValidations = [
    isValidToken,
    protectRouteByRole([
        UserRole.Admin
    ])
];
var createDefenseVlidations = [
    body("keyWords").customSanitizer(function(words) {
        return JSON.parse(words);
    }).isArray({
        min: 1,
        max: 30
    }).withMessage("keyWords must be an array with at least one element").custom(function(words) {
        return words.every(function(word) {
            return word !== "";
        });
    }),
    body("recoms").isString().withMessage("Invalid recoms"),
    body("evaluation").isNumeric().isInt({
        min: 2,
        max: 5
    }).withMessage("Evaluation must be a number between 2 and 5").customSanitizer(function(evalu) {
        return Number(evalu);
    }),
    body("court").isMongoId().withMessage("court must be a valid id"),
    body("project").isMongoId().withMessage("project must be a valid id"),
    body("date").isString().withMessage("Invalid date").toDate()
];
// Route for creating a new defense record
router.post("/", [
    // ...authValidations,
    multerMiddleware.fields([
        {
            name: "docFile",
            maxCount: 1
        },
        {
            name: "presFile",
            maxCount: 1
        }
    ])
].concat(_to_consumable_array(createDefenseVlidations), [
    validateRequest
]), DefenseController.createDefense);
var searchValidations = [
    query("query").exists({
        values: "falsy"
    }).withMessage("The query must be defined in the url ?query= ").isString().withMessage("The query must be a string")
];
// Route to search for al defenses
router.get("/search", _to_consumable_array(searchValidations).concat([
    validateRequest
]), DefenseController.search);
