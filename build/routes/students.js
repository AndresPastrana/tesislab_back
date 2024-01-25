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
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
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
import { Router } from "express";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { CursoType, Sex, UserRole } from "../const.js";
import { isValidToken } from "../middleware/jwt.js";
import { validateRequest } from "../middleware/validate.js";
import { StudentController } from "../controllers/index.js";
import { body, param, query } from "express-validator";
import { validateCi } from "../helpers/ci.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelStudent } from "../models/Student.js";
import { Types, isValidObjectId } from "mongoose";
import { ModelUser } from "../models/User.js";
import { getStudentHistory } from "../controllers/others.js";
//   GET   /student/project-tesis/:id
//   GET   /student/historial/:id
//   GET   /student/evaluations/
//   GET   /student/evaluations/:id
//   GET   /student/:id
export var router = Router();
var authValidations = [
    isValidToken,
    protectRouteByRole([
        UserRole.Admin
    ])
];
// TODO: Validate that ci can not be repeated in create and update
var createStudentValidations = [
    body("ci").isLength({
        min: 11,
        max: 11
    }).isNumeric().custom(function(ci) {
        if (validateCi(ci)) {
            return true;
        }
        throw new Error("Invalid ci");
    }),
    body("name").trim().escape().notEmpty().isString().toLowerCase(),
    body("lastname").trim().escape().notEmpty().isString().toLowerCase(),
    body("phone").notEmpty().isNumeric().isLength({
        min: 8,
        max: 8
    }),
    body("sex").trim().escape().toLowerCase().isIn(Object.values(Sex)),
    body("address").trim().escape().notEmpty().isString(),
    body("language_certificate").isBoolean(),
    body("email").trim().escape().isString().isEmail().normalizeEmail(),
    body("curso").trim().escape().isIn(Object.values(CursoType)).withMessage("Invalid course type")
];
var updateValidations = [
    body("user_id").exists({
        values: "falsy"
    }).withMessage("user_id is required").isMongoId().withMessage("Invalid id format").custom(function() {
        var _ref = _async_to_generator(function(id) {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            isValidDoc(id, ModelUser)
                        ];
                    case 1:
                        return [
                            2,
                            _state.sent()
                        ];
                }
            });
        });
        return function(id) {
            return _ref.apply(this, arguments);
        };
    }()),
    body("ci").isLength({
        min: 11,
        max: 11
    }).withMessage("CI must be 11 length").isNumeric().withMessage("CI must be 11 length").custom(function(ci) {
        if (validateCi(ci)) {
            return true;
        }
        throw new Error("Invalid ci");
    }).optional(),
    body("name").trim().escape().notEmpty().isString().toLowerCase().optional(),
    body("lastname").trim().escape().notEmpty().isString().toLowerCase().optional(),
    body("phone").notEmpty().isNumeric().isLength({
        min: 8,
        max: 8
    }).optional(),
    body("sex").trim().escape().toLowerCase().isIn(Object.values(Sex)).optional(),
    body("address").trim().escape().notEmpty().isString().optional(),
    body("language_certificate").isBoolean().optional(),
    body("email").trim().escape().isString().isEmail().normalizeEmail().optional(),
    body("curso").trim().escape().isIn(Object.values(CursoType)).withMessage("Invalid course type")
];
var validateIdParam = [
    param("id").trim().escape().exists({
        values: "falsy"
    }).withMessage("id is required").isMongoId().withMessage("Invalid mongo id").if(function(id) {
        return isValidObjectId(id);
    }).withMessage("Invalid mongo id").custom(function() {
        var _ref = _async_to_generator(function(id) {
            var is;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            isValidDoc(id, ModelStudent)
                        ];
                    case 1:
                        is = _state.sent();
                        if (is) {
                            return [
                                2,
                                true
                            ];
                        }
                        throw new Error("Student not found");
                }
            });
        });
        return function(id) {
            return _ref.apply(this, arguments);
        };
    }()).withMessage("Student not found").customSanitizer(function(id) {
        return new Types.ObjectId(id);
    })
];
router.post("/", _to_consumable_array(authValidations).concat(_to_consumable_array(createStudentValidations), [
    validateRequest
]), StudentController.createStudent);
router.put("/:id", _to_consumable_array(authValidations).concat(_to_consumable_array(validateIdParam), _to_consumable_array(updateValidations), [
    validateRequest
]), StudentController.updateStudent);
router.delete("/:id", _to_consumable_array(authValidations).concat(_to_consumable_array(validateIdParam)), StudentController.deleteStudent);
router.get("/:id", [
    authValidations[0],
    protectRouteByRole([
        UserRole.Admin,
        UserRole.Profesor,
        UserRole.Student
    ])
].concat(_to_consumable_array(validateIdParam)), StudentController.getStudentById);
router.get("/history/:id", [
    param("id").isMongoId().customSanitizer(function(id) {
        return new Types.ObjectId(id);
    }),
    validateRequest
], getStudentHistory);
router.get("/", _to_consumable_array(authValidations).concat([
    query("active").isBoolean().withMessage("?active=boolean is required"),
    validateRequest
]), StudentController.getStudents);
