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
import { ErrorHandlerFactory } from "../errors/error.js";
import { ModelProfesor } from "../models/Profesor.js";
export var ProfesorService = /*#__PURE__*/ function() {
    "use strict";
    function ProfesorService() {
        _class_call_check(this, ProfesorService);
    }
    _create_class(ProfesorService, null, [
        {
            key: "createProfesor",
            value: function createProfesor(profesorData) {
                var _this = this;
                return _async_to_generator(function() {
                    var isUnique, createdProfesor;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.isProfessorUnique(profesorData.email, profesorData.ci)
                                ];
                            case 1:
                                isUnique = _state.sent();
                                if (!isUnique) throw new Error("Duplicated email or ci");
                                return [
                                    4,
                                    _this.Profesor.create(profesorData)
                                ];
                            case 2:
                                createdProfesor = _state.sent();
                                return [
                                    2,
                                    createdProfesor.toObject()
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getProfesores",
            value: function getProfesores() {
                var _this = this;
                return _async_to_generator(function() {
                    var profesores;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.Profesor.find()
                                ];
                            case 1:
                                profesores = _state.sent();
                                return [
                                    2,
                                    profesores.map(function(profesor) {
                                        return profesor.toJSON();
                                    })
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getProfesorById",
            value: function getProfesorById(profesorId) {
                var _this = this;
                return _async_to_generator(function() {
                    var profesor;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.Profesor.findById(profesorId)
                                ];
                            case 1:
                                profesor = _state.sent();
                                return [
                                    2,
                                    profesor ? profesor.toObject() : null
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateProfesor",
            value: function updateProfesor(profesorId, profesorData) {
                var _this = this;
                return _async_to_generator(function() {
                    var isUnique, updatedProfesor;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.isProfessorUnique(profesorData.email, profesorData.ci, profesorId)
                                ];
                            case 1:
                                isUnique = _state.sent();
                                if (!isUnique) throw new Error("Duplicated email or ci");
                                return [
                                    4,
                                    _this.Profesor.findByIdAndUpdate(profesorId, profesorData, {
                                        new: true
                                    })
                                ];
                            case 2:
                                updatedProfesor = _state.sent();
                                return [
                                    2,
                                    updatedProfesor ? updatedProfesor.toObject() : null
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteProfesor",
            value: function deleteProfesor(profesorId) {
                var _this = this;
                return _async_to_generator(function() {
                    var deletedProfesor;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.Profesor.findByIdAndUpdate(profesorId, {
                                        ancient: true
                                    }, {
                                        new: true
                                    })
                                ];
                            case 1:
                                deletedProfesor = _state.sent();
                                if (!deletedProfesor) throw new Error("Professor not found for deletion");
                                return [
                                    2,
                                    deletedProfesor._id
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "isProfessorUnique",
            value: function isProfessorUnique(email, ci, excludeProfessorId) {
                var _this = this;
                return _async_to_generator(function() {
                    var existingProfessor, error;
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
                                    _this.Profesor.findOne({
                                        $or: [
                                            {
                                                email: email === null || email === void 0 ? void 0 : email.toLowerCase()
                                            },
                                            {
                                                ci: ci === null || ci === void 0 ? void 0 : ci.toLowerCase()
                                            }
                                        ],
                                        _id: {
                                            $ne: excludeProfessorId
                                        }
                                    })
                                ];
                            case 1:
                                existingProfessor = _state.sent();
                                // If there's an existing professor, it's not unique
                                return [
                                    2,
                                    !existingProfessor
                                ];
                            case 2:
                                error = _state.sent();
                                console.log(error);
                                throw _this.ErrorFactory.createError(new Error("Error checking professor uniqueness"));
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
            key: "doesProfessorExist",
            value: function doesProfessorExist(filter) {
                var _this = this;
                return _async_to_generator(function() {
                    var existingProfessor, error;
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
                                    _this.Profesor.findOne(filter)
                                ];
                            case 1:
                                existingProfessor = _state.sent();
                                return [
                                    2,
                                    !!existingProfessor
                                ]; // Returns true if the professor exists, false otherwise
                            case 2:
                                error = _state.sent();
                                throw _this.ErrorFactory.createError(new Error("Error checking professor existence"));
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return ProfesorService;
}();
_define_property(ProfesorService, "Profesor", ModelProfesor);
_define_property(ProfesorService, "ErrorFactory", ErrorHandlerFactory);
