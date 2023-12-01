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
import { Router } from "express";
import { body, param } from "express-validator";
import { CourtsController } from "../controllers/courts.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelCourt } from "../models/Court.js";
import { validateRequest } from "../middleware/validate.js";
import { CourtRole } from "../const.js";
import { ModelProfesor } from "../models/Profesor.js";
import { Types } from "mongoose";
export var router = Router();
// TODO:
// Validate that each profesor is  not in any other court
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
    }).withMessage("Roles can not be repeated in the court").custom(function() {
        var _ref = _async_to_generator(function(members) {
            var results;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            Promise.all(members.map(function() {
                                var _ref = _async_to_generator(function(param) {
                                    var p, match;
                                    return _ts_generator(this, function(_state) {
                                        switch(_state.label){
                                            case 0:
                                                p = param.profesor;
                                                return [
                                                    4,
                                                    ModelCourt.findOne({
                                                        members: {
                                                            $elemMatch: {
                                                                profesor: new Types.ObjectId(p)
                                                            }
                                                        }
                                                    })
                                                ];
                                            case 1:
                                                match = _state.sent();
                                                return [
                                                    2,
                                                    !!match
                                                ]; // Converts match to a boolean
                                        }
                                    });
                                });
                                return function(_) {
                                    return _ref.apply(this, arguments);
                                };
                            }()))
                        ];
                    case 1:
                        results = _state.sent();
                        if (results.includes(true)) throw new Error("A profesor can be in just one court");
                        return [
                            2,
                            true
                        ];
                }
            });
        });
        return function(members) {
            return _ref.apply(this, arguments);
        };
    }())
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
router.post("/", _to_consumable_array(validateCreateCourt).concat([
    validateRequest
]), CourtsController.createCourt);
router.put("/:courtId", validateUpdateCourt, CourtsController.updateCourt);
router.get("/:courtId", param("courtId").isMongoId().withMessage("Invalid Court ID"), CourtsController.getCourtById);
//TODO: Validate that te court exist
router.delete("/:courtId", param("courtId").isMongoId().withMessage("Invalid Court ID"), CourtsController.deleteCourt);
