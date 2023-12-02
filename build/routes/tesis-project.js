function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
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
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return(g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g);
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import express from "express";
import { TesisProjectController } from "../controllers/index.js";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validate.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelStudent } from "../models/Student.js";
import { ModelTesisProject } from "../models/TesisProject.js";
import { Types, isValidObjectId } from "mongoose";
import { ModelProfesor } from "../models/Profesor.js";
import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { UserRole } from "../const.js";
export var router = express.Router();
var authValidations = [
    isValidToken,
    protectRouteByRole([
        UserRole.Admin
    ])
];
var createProjectValidations = [
    body("topic").trim().escape().exists({
        values: "falsy"
    }).withMessage("topic is required").isString().withMessage("Topic must be a string").isLength({
        min: 10,
        max: 200
    }).withMessage("Topcic msut be between 10 and 200 characters").toLowerCase(),
    body("general_target").trim().escape().isString().withMessage("genearl_target must be a string").isLength({
        min: 10,
        max: 200
    }).withMessage("genearl_target msut be between 10 and 200 characters").toLowerCase(),
    body("scientific_problem").trim().escape().exists({
        values: "falsy"
    }).withMessage("scientific_problem is required").isString().withMessage("scientific_problem must be a string").isLength({
        min: 20,
        max: 500
    }).withMessage("scientific_problem msut be between 20 and 500 characters").toLowerCase(),
    body("student").optional().isMongoId().withMessage("Invalid id format").if(function(id) {
        return isValidObjectId(id);
    }).custom(function(student_id) {
        return isValidDoc(student_id, ModelStudent);
    }).customSanitizer(function(student_id) {
        return new Types.ObjectId(student_id);
    }).custom(function() {
        var _ref = _async_to_generator(function(student_id) {
            var st;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            ModelTesisProject.findOne({
                                student: student_id
                            })
                        ];
                    case 1:
                        st = _state.sent();
                        if (st) throw new Error("The student has asign another project");
                        return [
                            2,
                            true
                        ];
                }
            });
        });
        return function(student_id) {
            return _ref.apply(this, arguments);
        };
    }()),
    body("tutors").optional().isArray({
        min: 1
    }).withMessage("Tutors must be an array with 1 ore more element").optional(),
    body("tutors.*").optional().isMongoId().withMessage("Invalid mongo id").if(function(id) {
        return isValidObjectId(id);
    }).custom(function(tutor_id) {
        return isValidDoc(tutor_id, ModelProfesor);
    }).withMessage("Tutor not found").customSanitizer(function(tutor_id) {
        return new Types.ObjectId(tutor_id);
    })
];
var updateProjectValidations = [
    body("topic").trim().escape().exists({
        values: "falsy"
    }).withMessage("topic is required").isString().withMessage("Topic must be a string").isLength({
        min: 10,
        max: 200
    }).withMessage("Topcic msut be between 10 and 200 characters").toLowerCase().optional(),
    body("general_target").trim().escape().isString().withMessage("genearl_target must be a string").isLength({
        min: 10,
        max: 200
    }).withMessage("genearl_target msut be between 10 and 200 characters").toLowerCase().optional(),
    body("scientific_problem").trim().escape().exists({
        values: "falsy"
    }).withMessage("scientific_problem is required").isString().withMessage("scientific_problem must be a string").isLength({
        min: 20,
        max: 500
    }).withMessage("scientific_problem msut be between 20 and 500 characters").toLowerCase().optional(),
    body("student").optional().isMongoId().withMessage("Invalid id format").if(function(id) {
        return isValidObjectId(id);
    }).custom(function(student_id) {
        return isValidDoc(student_id, ModelStudent);
    }).customSanitizer(function(student_id) {
        return new Types.ObjectId(student_id);
    }).custom(function() {
        var _ref = _async_to_generator(function(student_id) {
            return _ts_generator(this, function(_state) {
                // TODO: Uncoment this later on
                // const st = await ModelTesisProject.findOne({ student: student_id });
                // if (st) throw new Error("The student has asign another project");
                return [
                    2,
                    true
                ];
            });
        });
        return function(student_id) {
            return _ref.apply(this, arguments);
        };
    }()).optional(),
    body("tutors").optional().isArray({
        min: 1
    }).withMessage("Tutors must be an array with 1 ore more element").optional(),
    body("tutors.*").isMongoId().withMessage("Invalid mongo id").if(function(id) {
        return isValidObjectId(id);
    }).custom(function(tutor_id) {
        return isValidDoc(tutor_id, ModelProfesor);
    }).withMessage("Tutor not found").customSanitizer(function(tutor_id) {
        return new Types.ObjectId(tutor_id);
    }).optional()
];
// Validation middleware for project ID parameter
var validateProjectId = [
    param("id").isMongoId()
];
var validateGetParam = [
    param("old", "old must be a boolean value, exmaple: ?old=false").isBoolean().optional()
];
// Create TesisProject
router.post("/", _to_consumable_array(authValidations).concat(_to_consumable_array(createProjectValidations), [
    validateRequest
]), TesisProjectController.createTesisProject);
// Edit TesisProject
router.put("/:id", _to_consumable_array(authValidations).concat(_to_consumable_array(validateProjectId), _to_consumable_array(updateProjectValidations), [
    validateRequest
]), TesisProjectController.editTesisProject);
// Close TesisProject
router.put("/close/:id", _to_consumable_array(authValidations).concat(_to_consumable_array(validateProjectId)), TesisProjectController.closeTesisProject);
// Get all tesis project
router.get("/", _to_consumable_array(authValidations));
// Get TesisProject Info
router.get("/:id", [
    authValidations[0],
    protectRouteByRole([
        UserRole.Admin
    ])
].concat(_to_consumable_array(validateProjectId)), TesisProjectController.getTesisProjectInfo);
// Approve TesisProject
// TODO: validate that the profesor that is tryying to aprove this proyect thesis is a tutor of the project
router.put("/approve/:id", _to_consumable_array(authValidations).concat(_to_consumable_array(validateProjectId), [
    validateRequest
]), TesisProjectController.approveTesisProject);
// Update Functional Requirements
// TODO: validate that the syudent that is trying to update the fc is the student that belogns to this proyect
router.put("/update-functional/:id", validateProjectId, body("functionalRequirements").isArray(), TesisProjectController.updateFunctionalRequirements);
export default router;
