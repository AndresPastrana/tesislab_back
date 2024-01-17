function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
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
import { matchedData } from "express-validator";
import { UserRole } from "../const.js";
import { ModelProfesor } from "../models/Profesor.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { ProfesorService, UserService, EmailService } from "../services/index.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { generarMensajeCambioEmail, htmlTemplateCred } from "../helpers/html.js";
import { caluculateAge } from "../helpers/age.js";
import { TesisProjectService } from "../services/TesisProject.js";
import { ModelCourt } from "../models/Court.js";
import { Types } from "mongoose";
import { CourtsService } from "../services/CourtService.js";
import { ModelTesisProject } from "../models/TesisProject.js";
export var ProfesorController = {
    createProfesor: function() {
        var _ref = _async_to_generator(function(req, res) {
            var profesorData, age, new_user, createdProfesor, info, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            4,
                            ,
                            5
                        ]);
                        profesorData = matchedData(req, {
                            locations: [
                                "body"
                            ]
                        });
                        age = caluculateAge(profesorData.ci);
                        return [
                            4,
                            UserService.registerUser({
                                role: UserRole.Profesor,
                                email: profesorData.email
                            })
                        ];
                    case 1:
                        new_user = _state.sent();
                        return [
                            4,
                            ProfesorService.createProfesor(_object_spread_props(_object_spread({}, profesorData), {
                                user_id: new_user.user.id,
                                age: age
                            }))
                        ];
                    case 2:
                        createdProfesor = _state.sent();
                        console.log(createdProfesor.email);
                        console.log(new_user.user.username);
                        return [
                            4,
                            EmailService.sendEmail({
                                to: createdProfesor.email,
                                html: "".concat(htmlTemplateCred(new_user.user.username, new_user.user.password))
                            })
                        ];
                    case 3:
                        info = _state.sent();
                        return [
                            2,
                            handleResponse({
                                statusCode: 201,
                                msg: "Profesor created successfully",
                                data: createdProfesor,
                                res: res
                            })
                        ];
                    case 4:
                        error = _state.sent();
                        console.log(error);
                        handleResponse({
                            statusCode: 500,
                            msg: "Error creating Profesor",
                            error: ErrorHandlerFactory.createError(error),
                            res: res
                        });
                        return [
                            3,
                            5
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        });
        return function(req, res) {
            return _ref.apply(this, arguments);
        };
    }(),
    getProfesores: function() {
        var _ref = _async_to_generator(function(req, res) {
            var profesores, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            ProfesorService.getProfesores()
                        ];
                    case 1:
                        profesores = _state.sent();
                        handleResponse({
                            statusCode: 200,
                            msg: "Profesores retrieved successfully",
                            data: profesores,
                            res: res
                        });
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        customError = ErrorHandlerFactory.createError(error);
                        handleResponse({
                            statusCode: 500,
                            msg: "Error retrieving Profesores",
                            error: customError,
                            res: res
                        });
                        return [
                            3,
                            3
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        });
        return function(req, res) {
            return _ref.apply(this, arguments);
        };
    }(),
    getProfesorById: function() {
        var _ref = _async_to_generator(function(req, res) {
            var profesorId, profesor, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        profesorId = req.params.id;
                        return [
                            4,
                            ProfesorService.getProfesorById(profesorId)
                        ];
                    case 1:
                        profesor = _state.sent();
                        if (!profesor) {
                            handleResponse({
                                statusCode: 404,
                                msg: "Profesor not found",
                                res: res
                            });
                            return [
                                2
                            ];
                        }
                        handleResponse({
                            statusCode: 200,
                            msg: "Profesor retrieved successfully",
                            data: profesor,
                            res: res
                        });
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        customError = ErrorHandlerFactory.createError(error);
                        handleResponse({
                            statusCode: 500,
                            msg: "Error retrieving Profesor",
                            error: customError,
                            res: res
                        });
                        return [
                            3,
                            3
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        });
        return function(req, res) {
            return _ref.apply(this, arguments);
        };
    }(),
    getCourtByProfessorId: function() {
        var _ref = _async_to_generator(function(req, res) {
            var _req_user, professorId, professor, court, courtInfo, populatedCourt, professorAndCourtData, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            5,
                            ,
                            6
                        ]);
                        // Extract professor ID from the authenticated user
                        professorId = (_req_user = req.user) === null || _req_user === void 0 ? void 0 : _req_user.userId;
                        return [
                            4,
                            ModelProfesor.findById(professorId)
                        ];
                    case 1:
                        professor = _state.sent();
                        // Check if the professor was found
                        if (!professor) {
                            return [
                                2,
                                handleResponse({
                                    res: res,
                                    statusCode: 404,
                                    error: ErrorHandlerFactory.createError(new Error("Professor not found"))
                                })
                            ];
                        }
                        return [
                            4,
                            ModelCourt.findOne({
                                "members.profesor": new Types.ObjectId(professorId)
                            })
                        ];
                    case 2:
                        court = _state.sent();
                        return [
                            4,
                            CourtsService.getCourtInfoById(court === null || court === void 0 ? void 0 : court._id)
                        ];
                    case 3:
                        courtInfo = _state.sent();
                        return [
                            4,
                            court === null || court === void 0 ? void 0 : court.populate("members.profesor", "name lastname academic_rank")
                        ];
                    case 4:
                        populatedCourt = _state.sent();
                        // Combine professor and court information
                        professorAndCourtData = {
                            professor: professor.toJSON(),
                            court: courtInfo
                        };
                        // Return the combined data as a JSON response
                        return [
                            2,
                            handleResponse({
                                res: res,
                                data: _object_spread({}, professorAndCourtData),
                                statusCode: 200
                            })
                        ];
                    case 5:
                        error = _state.sent();
                        console.error(error);
                        return [
                            2,
                            res.status(500).json({
                                message: "Internal Server Error"
                            })
                        ];
                    case 6:
                        return [
                            2
                        ];
                }
            });
        });
        return function(req, res) {
            return _ref.apply(this, arguments);
        };
    }(),
    obtenerProyectosYAprobadosPorProfesor: function() {
        var _ref = _async_to_generator(function(req, res) {
            var _req_user, professorId, _ref, totalProyectos, proyectosAprobados, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        // Extract professor ID from the authenticated user
                        professorId = (_req_user = req.user) === null || _req_user === void 0 ? void 0 : _req_user.userId;
                        return [
                            4,
                            Promise.all([
                                ModelTesisProject.countDocuments({
                                    tutors: professorId
                                }),
                                ModelTesisProject.countDocuments({
                                    tutors: professorId,
                                    "approval.isApprove": true
                                })
                            ])
                        ];
                    case 1:
                        _ref = _sliced_to_array.apply(void 0, [
                            _state.sent(),
                            2
                        ]), totalProyectos = _ref[0], proyectosAprobados = _ref[1];
                        // Enviar la respuesta
                        handleResponse({
                            res: res,
                            statusCode: 200,
                            data: {
                                totalProyectos: totalProyectos,
                                proyectosAprobados: proyectosAprobados
                            }
                        });
                        return [
                            2
                        ];
                    case 2:
                        error = _state.sent();
                        // Manejar errores en la solicitud
                        console.error(error);
                        res.status(500).json({
                            error: "Error al procesar la solicitud"
                        });
                        return [
                            3,
                            3
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        });
        return function(req, res) {
            return _ref.apply(this, arguments);
        };
    }(),
    updateProfesor: function() {
        var _ref = _async_to_generator(function(req, res) {
            var id, profesorData, dynamicObject, _ref, _ref_user, username, password, updatedProfesor, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            7,
                            ,
                            8
                        ]);
                        id = matchedData(req, {
                            locations: [
                                "params"
                            ]
                        }).id;
                        profesorData = matchedData(req, {
                            locations: [
                                "body"
                            ]
                        });
                        console.log(id);
                        console.log(profesorData);
                        if (!(Object.keys(profesorData).length >= 1)) return [
                            3,
                            5
                        ];
                        dynamicObject = new Object();
                        // Set the new ci and recalculate the age if the ci is in the profesorData
                        if (profesorData.ci) {
                            dynamicObject.ci = profesorData.ci;
                            dynamicObject.age = caluculateAge(profesorData.ci);
                        }
                        if (!profesorData.email) return [
                            3,
                            3
                        ];
                        return [
                            4,
                            UserService.updateUser({
                                userId: profesorData.user_id,
                                newEmail: profesorData.email
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), _ref_user = _ref.user, username = _ref_user.username, password = _ref_user.password;
                        // Send email
                        return [
                            4,
                            EmailService.sendEmail({
                                to: profesorData.email,
                                html: generarMensajeCambioEmail(username, profesorData.email, password)
                            })
                        ];
                    case 2:
                        _state.sent();
                        _state.label = 3;
                    case 3:
                        return [
                            4,
                            ProfesorService.updateProfesor(id, _object_spread({}, profesorData, dynamicObject))
                        ];
                    case 4:
                        updatedProfesor = _state.sent();
                        if (!updatedProfesor) {
                            handleResponse({
                                statusCode: 404,
                                msg: "Profesor not found",
                                res: res
                            });
                            return [
                                2
                            ];
                        }
                        handleResponse({
                            statusCode: 200,
                            msg: "Profesor updated successfully",
                            data: updatedProfesor,
                            res: res
                        });
                        return [
                            3,
                            6
                        ];
                    case 5:
                        return [
                            2,
                            handleResponse({
                                res: res,
                                statusCode: 400,
                                error: {
                                    error: {
                                        name: "ValidationError",
                                        message: "Nothing to update"
                                    }
                                }
                            })
                        ];
                    case 6:
                        return [
                            3,
                            8
                        ];
                    case 7:
                        error = _state.sent();
                        console.log(error);
                        customError = ErrorHandlerFactory.createError(error);
                        handleResponse({
                            statusCode: 500,
                            msg: "Error updating Profesor",
                            error: customError,
                            res: res
                        });
                        return [
                            3,
                            8
                        ];
                    case 8:
                        return [
                            2
                        ];
                }
            });
        });
        return function(req, res) {
            return _ref.apply(this, arguments);
        };
    }(),
    deleteProfesor: function() {
        var _ref = _async_to_generator(function(req, res) {
            var _matchedData, profesorId, profesor, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            4,
                            ,
                            5
                        ]);
                        // const profesorId = req.params.id;
                        _matchedData = matchedData(req, {
                            locations: [
                                "params"
                            ]
                        }), profesorId = _matchedData.id;
                        return [
                            4,
                            ProfesorService.getProfesorById(profesorId)
                        ];
                    case 1:
                        profesor = _state.sent();
                        if (!profesor) return [
                            3,
                            3
                        ];
                        return [
                            4,
                            Promise.all([
                                UserService.deactivateUser({
                                    userId: profesor.user_id
                                }),
                                ProfesorService.deleteProfesor(profesorId),
                                TesisProjectService.removeMemberFromTesisProject({
                                    typeOfMember: UserRole.Profesor,
                                    memberId: profesorId
                                })
                            ])
                        ];
                    case 2:
                        _state.sent();
                        _state.label = 3;
                    case 3:
                        handleResponse({
                            statusCode: 204,
                            msg: "Profesor deleted successfully",
                            res: res
                        });
                        return [
                            3,
                            5
                        ];
                    case 4:
                        error = _state.sent();
                        customError = ErrorHandlerFactory.createError(error);
                        handleResponse({
                            statusCode: 500,
                            msg: "Error deleting Profesor",
                            error: customError,
                            res: res
                        });
                        return [
                            3,
                            5
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        });
        return function(req, res) {
            return _ref.apply(this, arguments);
        };
    }()
};
