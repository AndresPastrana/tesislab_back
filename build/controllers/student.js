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
import { EmailService, StudentService, UserService } from "../services/index.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { generarMensajeCambioEmail, htmlTemplateCred } from "../helpers/html.js";
import { caluculateAge } from "../helpers/age.js";
import { TesisProjectService } from "../services/TesisProject.js";
export var StudentController = {
    createStudent: function() {
        var _ref = _async_to_generator(function(req, res) {
            var studentData, newUser, createdStudent, email, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            4,
                            ,
                            5
                        ]);
                        studentData = matchedData(req, {
                            locations: [
                                "body"
                            ]
                        });
                        return [
                            4,
                            UserService.registerUser({
                                role: UserRole.Student,
                                email: studentData.email
                            })
                        ];
                    case 1:
                        newUser = _state.sent();
                        return [
                            4,
                            StudentService.createStudent(_object_spread_props(_object_spread({}, studentData), {
                                age: caluculateAge(studentData.ci),
                                user_id: newUser.user.id
                            }))
                        ];
                    case 2:
                        createdStudent = _state.sent();
                        return [
                            4,
                            EmailService.sendEmail({
                                to: createdStudent.email,
                                html: "".concat(htmlTemplateCred(newUser.user.username, newUser.user.password)),
                                subject: "Has sido agregado a upr.tesislab"
                            })
                        ];
                    case 3:
                        email = _state.sent();
                        console.log("Email sent");
                        handleResponse({
                            statusCode: 201,
                            msg: "Student created successfully",
                            data: createdStudent,
                            res: res
                        });
                        return [
                            3,
                            5
                        ];
                    case 4:
                        error = _state.sent();
                        console.log(error);
                        customError = ErrorHandlerFactory.createError(error);
                        handleResponse({
                            statusCode: 500,
                            msg: "Error creating student",
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
    }(),
    getStudents: function() {
        var _ref = _async_to_generator(function(req, res) {
            var active, students, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        active = matchedData(req, {
                            locations: [
                                "query"
                            ]
                        }).active;
                        return [
                            4,
                            StudentService.getStudents(active)
                        ];
                    case 1:
                        students = _state.sent();
                        handleResponse({
                            statusCode: 200,
                            msg: "Students retrieved successfully",
                            data: students,
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
                            msg: "Error retrieving students",
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
    getStudentById: function() {
        var _ref = _async_to_generator(function(req, res) {
            var studentId, student, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        studentId = req.params.id;
                        return [
                            4,
                            StudentService.getStudentById(studentId)
                        ];
                    case 1:
                        student = _state.sent();
                        if (!student) {
                            handleResponse({
                                statusCode: 404,
                                msg: "Student not found",
                                res: res
                            });
                            return [
                                2
                            ];
                        }
                        handleResponse({
                            statusCode: 200,
                            msg: "Student retrieved successfully",
                            data: student,
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
                            msg: "Error retrieving student",
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
    updateStudent: function() {
        var _ref = _async_to_generator(function(req, res) {
            var obj, id, studentData, _ref, _ref_user, username, password, updatedStudent, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            5,
                            ,
                            6
                        ]);
                        obj = Object.create(null);
                        id = matchedData(req, {
                            locations: [
                                "params"
                            ]
                        }).id;
                        studentData = matchedData(req, {
                            locations: [
                                "body"
                            ]
                        });
                        if (studentData.ci) {
                            obj["ci"] = studentData.ci;
                            obj["age"] = caluculateAge(studentData.ci);
                        }
                        if (!studentData.email) return [
                            3,
                            3
                        ];
                        obj["email"] = studentData.email;
                        return [
                            4,
                            UserService.updateUser({
                                userId: studentData.user_id,
                                newEmail: studentData.email
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), _ref_user = _ref.user, username = _ref_user.username, password = _ref_user.password;
                        // Send email
                        return [
                            4,
                            EmailService.sendEmail({
                                to: studentData.email,
                                html: generarMensajeCambioEmail(username, studentData.email, password),
                                subject: "Nuevas Credenciales"
                            })
                        ];
                    case 2:
                        _state.sent();
                        _state.label = 3;
                    case 3:
                        return [
                            4,
                            StudentService.updateStudent(id, _object_spread({}, studentData, obj))
                        ];
                    case 4:
                        updatedStudent = _state.sent();
                        if (!updatedStudent) {
                            handleResponse({
                                statusCode: 404,
                                msg: "Student not found",
                                res: res
                            });
                            return [
                                2
                            ];
                        }
                        handleResponse({
                            statusCode: 200,
                            msg: "Student updated successfully",
                            data: updatedStudent,
                            res: res
                        });
                        return [
                            3,
                            6
                        ];
                    case 5:
                        error = _state.sent();
                        customError = ErrorHandlerFactory.createError(error);
                        handleResponse({
                            statusCode: 500,
                            msg: "Error updating student",
                            error: customError,
                            res: res
                        });
                        return [
                            3,
                            6
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
    deleteStudent: function() {
        var _ref = _async_to_generator(function(req, res) {
            var _matchedData, studentId, student, error, customError;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            4,
                            ,
                            5
                        ]);
                        // const studentId = req.params.id;
                        _matchedData = matchedData(req, {
                            locations: [
                                "params"
                            ]
                        }), studentId = _matchedData.id;
                        return [
                            4,
                            StudentService.getStudentById(studentId)
                        ];
                    case 1:
                        student = _state.sent();
                        if (!student) return [
                            3,
                            3
                        ];
                        console.log(student.user_id);
                        console.log(studentId);
                        return [
                            4,
                            Promise.all([
                                UserService.deactivateUser({
                                    userId: student.user_id
                                }),
                                StudentService.deleteStudent(studentId),
                                TesisProjectService.removeMemberFromTesisProject({
                                    typeOfMember: UserRole.Student,
                                    memberId: studentId
                                })
                            ])
                        ];
                    case 2:
                        _state.sent();
                        _state.label = 3;
                    case 3:
                        handleResponse({
                            statusCode: 204,
                            msg: "Student deleted successfully",
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
                            msg: "Error deleting student",
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
    }(),
    getHistorial: function() {
        var _ref = _async_to_generator(function(req, res) {
            var _matchedData, studentId;
            return _ts_generator(this, function(_state) {
                try {
                    _matchedData = matchedData(req, {
                        locations: [
                            "params"
                        ]
                    }), studentId = _matchedData.id;
                // TODO: get the aproval info of the thesis project
                //TODO: Get a list of all his evaluations
                // TODO: Get the info  of the defense of the project that belongs to this students
                } catch (error) {}
                return [
                    2
                ];
            });
        });
        return function(req, res) {
            return _ref.apply(this, arguments);
        };
    }()
};
