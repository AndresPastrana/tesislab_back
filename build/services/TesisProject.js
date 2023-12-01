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
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
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
import { TesisProjectStatus, UserRole } from "../const.js";
import { ModelTesisProject } from "../models/TesisProject.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { ModelProfesor } from "../models/Profesor.js";
export var TesisProjectService = /*#__PURE__*/ function() {
    "use strict";
    function TesisProjectService() {
        _class_call_check(this, TesisProjectService);
    }
    _create_class(TesisProjectService, null, [
        {
            key: "createTesisProject",
            value: function createTesisProject(data) {
                var _this = this;
                return _async_to_generator(function() {
                    var newTesisProject, error;
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
                                    _this.ModelTesisProject.create(data)
                                ];
                            case 1:
                                newTesisProject = _state.sent();
                                if (!newTesisProject) {
                                    throw new Error("Error creating a new tesis project");
                                }
                                return [
                                    2,
                                    _this.formatTesisProjectResponse(newTesisProject)
                                ];
                            case 2:
                                error = _state.sent();
                                throw ErrorHandlerFactory.createError(error);
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
            key: "editTesisProject",
            value: function editTesisProject(projectId, data) {
                var _this = this;
                return _async_to_generator(function() {
                    var updatedTesisProject, error;
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
                                    _this.ModelTesisProject.findByIdAndUpdate(projectId, data, {
                                        new: true,
                                        runValidators: true
                                    })
                                ];
                            case 1:
                                updatedTesisProject = _state.sent();
                                if (!updatedTesisProject) {
                                    throw new Error("Error creating a new tesis project");
                                }
                                return [
                                    2,
                                    _this.formatTesisProjectResponse(updatedTesisProject)
                                ];
                            case 2:
                                error = _state.sent();
                                throw ErrorHandlerFactory.createError(error);
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
            key: "closeTesisProject",
            value: function closeTesisProject(projectId) {
                var _this = this;
                return _async_to_generator(function() {
                    var obj, error;
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
                                    _this.ModelTesisProject.findByIdAndUpdate(projectId, {
                                        status: TesisProjectStatus.Closed
                                    })
                                ];
                            case 1:
                                obj = _state.sent();
                                return [
                                    2,
                                    obj ? true : false
                                ];
                            case 2:
                                error = _state.sent();
                                throw ErrorHandlerFactory.createError(error);
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
            key: "getTesisProjectInfo",
            value: function getTesisProjectInfo(projectId) {
                var _this = this;
                return _async_to_generator(function() {
                    var tesisProject, error;
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
                                    _this.ModelTesisProject.findById(projectId)
                                ];
                            case 1:
                                tesisProject = _state.sent();
                                if (!tesisProject) {
                                    throw new Error("Error getting the info of the tesis project");
                                }
                                return [
                                    2,
                                    _this.formatTesisProjectResponse(tesisProject)
                                ];
                            case 2:
                                error = _state.sent();
                                throw ErrorHandlerFactory.createError(error);
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
            key: "approveTesisProject",
            value: function approveTesisProject(projectId) {
                var _this = this;
                return _async_to_generator(function() {
                    var approvedTesisProject, error;
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
                                    _this.ModelTesisProject.findByIdAndUpdate(projectId, {
                                        "approval.isApprove": true
                                    }, {
                                        new: true
                                    })
                                ];
                            case 1:
                                approvedTesisProject = _state.sent();
                                if (!approvedTesisProject) {
                                    throw new Error("Error approving tesis project");
                                }
                                return [
                                    2,
                                    _this.formatTesisProjectResponse(approvedTesisProject)
                                ];
                            case 2:
                                error = _state.sent();
                                throw ErrorHandlerFactory.createError(error);
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
            key: "updateFunctionalRequirements",
            value: function updateFunctionalRequirements(projectId, functionalRequirements) {
                var _this = this;
                return _async_to_generator(function() {
                    var updatedTesisProject, error;
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
                                    _this.ModelTesisProject.findByIdAndUpdate(projectId, {
                                        functional_requirements: functionalRequirements
                                    }, {
                                        new: true
                                    })
                                ];
                            case 1:
                                updatedTesisProject = _state.sent();
                                if (!updatedTesisProject) {
                                    throw new Error("Error updating tesis project");
                                }
                                return [
                                    2,
                                    _this.formatTesisProjectResponse(updatedTesisProject)
                                ];
                            case 2:
                                error = _state.sent();
                                throw ErrorHandlerFactory.createError(error);
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
            key: "formatTesisProjectResponse",
            value: function formatTesisProjectResponse(tesisProject) {
                var _tesisProject_toObject = tesisProject.toObject(), __v = _tesisProject_toObject.__v, _id = _tesisProject_toObject._id, id = _tesisProject_toObject.id, rest = _object_without_properties(_tesisProject_toObject, [
                    "__v",
                    "_id",
                    "id"
                ]);
                return _object_spread({
                    id: _id.toString()
                }, rest);
            }
        },
        {
            key: "removeMemberFromTesisProject",
            value: function removeMemberFromTesisProject(param) {
                var typeOfMember = param.typeOfMember, memberId = param.memberId;
                return _async_to_generator(function() {
                    var tesisProject, updatedDocs, error, err;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    5,
                                    ,
                                    6
                                ]);
                                if (!(typeOfMember === UserRole.Student)) return [
                                    3,
                                    2
                                ];
                                return [
                                    4,
                                    ModelTesisProject.findOneAndUpdate({
                                        student: memberId
                                    }, {
                                        student: null
                                    })
                                ];
                            case 1:
                                tesisProject = _state.sent();
                                _state.label = 2;
                            case 2:
                                if (!(typeOfMember === UserRole.Profesor)) return [
                                    3,
                                    4
                                ];
                                return [
                                    4,
                                    ModelTesisProject.updateMany({
                                        tutors: memberId
                                    }, {
                                        $pull: {
                                            tutors: memberId
                                        }
                                    })
                                ];
                            case 3:
                                updatedDocs = _state.sent();
                                _state.label = 4;
                            case 4:
                                return [
                                    3,
                                    6
                                ];
                            case 5:
                                error = _state.sent();
                                err = error;
                                throw new Error("Error in TesisProjectServices: ".concat(err.message));
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getApprovalInfo",
            value: function getApprovalInfo(studentId) {
                return _async_to_generator(function() {
                    var _tesisProject_approval, _tesisProject_approval_approvedBy, _tesisProject_approval1, _tesisProject_approval_approvedBy1, _tesisProject_approval2, _tesisProject_approval3, tesisProject, approvalInfo, error;
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
                                    ModelTesisProject.findOne({
                                        student: studentId
                                    }, {
                                        "approval.date": 1,
                                        "approval.approvedBy": 1,
                                        "approval.recommendations": 1
                                    }).populate({
                                        path: "approval.approvedBy",
                                        model: ModelProfesor,
                                        select: "name lastame"
                                    })
                                ];
                            case 1:
                                tesisProject = _state.sent();
                                // If tesisProject is not found, you can handle it as needed
                                if (!tesisProject) {
                                    return [
                                        2,
                                        null
                                    ]; // or throw an error, or return a default value
                                }
                                approvalInfo = {
                                    date: ((_tesisProject_approval = tesisProject.approval) === null || _tesisProject_approval === void 0 ? void 0 : _tesisProject_approval.date) || null,
                                    approvedBy: {
                                        name: ((_tesisProject_approval1 = tesisProject.approval) === null || _tesisProject_approval1 === void 0 ? void 0 : (_tesisProject_approval_approvedBy = _tesisProject_approval1.approvedBy) === null || _tesisProject_approval_approvedBy === void 0 ? void 0 : _tesisProject_approval_approvedBy.name) || null,
                                        lastName: ((_tesisProject_approval2 = tesisProject.approval) === null || _tesisProject_approval2 === void 0 ? void 0 : (_tesisProject_approval_approvedBy1 = _tesisProject_approval2.approvedBy) === null || _tesisProject_approval_approvedBy1 === void 0 ? void 0 : _tesisProject_approval_approvedBy1.lastname) || null
                                    },
                                    recommendations: ((_tesisProject_approval3 = tesisProject.approval) === null || _tesisProject_approval3 === void 0 ? void 0 : _tesisProject_approval3.recommendations) || []
                                };
                                return [
                                    2,
                                    approvalInfo
                                ];
                            case 2:
                                error = _state.sent();
                                console.error("Error fetching approval info:", error);
                                throw error; // You might want to handle this error more gracefully
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
    return TesisProjectService;
}();
_define_property(TesisProjectService, "ModelTesisProject", ModelTesisProject);
