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
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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
import { ModelStudent } from "../models/Student.js";
import { ErrorHandlerFactory } from "../errors/error.js";
export var StudentService = /*#__PURE__*/ function() {
    "use strict";
    function StudentService() {
        _class_call_check(this, StudentService);
    }
    _create_class(StudentService, null, [
        {
            key: "createStudent",
            value: function createStudent(studentData) {
                var _this = this;
                return _async_to_generator(function() {
                    var createdStudent, error;
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
                                    _this.Student.create(studentData)
                                ];
                            case 1:
                                createdStudent = _state.sent();
                                return [
                                    2,
                                    createdStudent.toObject()
                                ];
                            case 2:
                                error = _state.sent();
                                throw _this.ErrorFactory.createError(error);
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getStudents",
            value: //TODO: Add a flag th shwo all students or just ancient = true
            function getStudents(active) {
                var _this = this;
                return _async_to_generator(function() {
                    var students, error;
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
                                    _this.Student.find({
                                        ancient: active
                                    })
                                ];
                            case 1:
                                students = _state.sent();
                                return [
                                    2,
                                    students.map(function(student) {
                                        return student.toJSON();
                                    })
                                ];
                            case 2:
                                error = _state.sent();
                                throw _this.ErrorFactory.createError(error);
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getStudentById",
            value: function getStudentById(studentId) {
                var _this = this;
                return _async_to_generator(function() {
                    var student, error;
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
                                    _this.Student.findById(studentId)
                                ];
                            case 1:
                                student = _state.sent();
                                return [
                                    2,
                                    student ? student.toObject() : null
                                ];
                            case 2:
                                error = _state.sent();
                                throw _this.ErrorFactory.createError(error);
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateStudent",
            value: function updateStudent(studentId, studentData) {
                var _this = this;
                return _async_to_generator(function() {
                    var updatedStudent, error;
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
                                    _this.Student.findByIdAndUpdate(studentId, studentData, {
                                        new: true
                                    })
                                ];
                            case 1:
                                updatedStudent = _state.sent();
                                return [
                                    2,
                                    updatedStudent ? updatedStudent.toObject() : null
                                ];
                            case 2:
                                error = _state.sent();
                                throw _this.ErrorFactory.createError(error);
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteStudent",
            value: function deleteStudent(studentId) {
                var _this = this;
                return _async_to_generator(function() {
                    var student;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.Student.findByIdAndUpdate(studentId, {
                                        ancient: true
                                    }, {
                                        new: true
                                    })
                                ];
                            case 1:
                                student = _state.sent();
                                return [
                                    2,
                                    student === null || student === void 0 ? void 0 : student._id
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return StudentService;
}();
_define_property(StudentService, "Student", ModelStudent);
_define_property(StudentService, "ErrorFactory", ErrorHandlerFactory);
