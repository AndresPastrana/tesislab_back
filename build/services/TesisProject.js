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
                                // if (!newTesisProject) {
                                //   throw new Error("Error creating a new tesis project");
                                // }
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
                                console.log(error);
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
            value: function getTesisProjectInfo(projectId, active) {
                var _this = this;
                return _async_to_generator(function() {
                    var status_filter, tesisProject, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                status_filter = _this.buildStatusFilter(active);
                                return [
                                    4,
                                    _this.ModelTesisProject.findOne(_object_spread_props(_object_spread({}, status_filter), {
                                        _id: projectId
                                    })).populate("student", "name lastname") // Adjust fields as needed
                                    .populate("tutors", "name lastname")
                                ];
                            case 1:
                                tesisProject = _state.sent();
                                if (!tesisProject) {
                                    throw new Error("Tesis project not found");
                                }
                                return [
                                    2,
                                    _this.formatPopulatedTesisResponse(tesisProject)
                                ];
                            case 2:
                                error = _state.sent();
                                throw error;
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
            key: "getAllProjects",
            value: function getAllProjects(active) {
                var _this = this;
                return _async_to_generator(function() {
                    var filter, tesisProjects, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                filter = _this.buildStatusFilter(active);
                                return [
                                    4,
                                    _this.ModelTesisProject.find(_object_spread({}, filter)).populate("student", "name lastname").populate("tutors", "name lastname")
                                ];
                            case 1:
                                tesisProjects = _state.sent();
                                // Map and format the response
                                return [
                                    2,
                                    tesisProjects.map(function(project) {
                                        return _this.formatPopulatedTesisResponse(project);
                                    })
                                ];
                            case 2:
                                error = _state.sent();
                                throw error;
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
            key: "getProjectsByMemberId",
            value: function getProjectsByMemberId(active, memberId, typeOfMember) {
                var _this = this;
                return _async_to_generator(function() {
                    var status_filter, filter, studentProject, professorProjects, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    7,
                                    ,
                                    8
                                ]);
                                status_filter = _this.buildStatusFilter(active);
                                filter = _object_spread({}, status_filter);
                                switch(typeOfMember){
                                    case UserRole.Student:
                                        return [
                                            3,
                                            1
                                        ];
                                    case UserRole.Profesor:
                                        return [
                                            3,
                                            3
                                        ];
                                }
                                return [
                                    3,
                                    5
                                ];
                            case 1:
                                filter.student = memberId;
                                return [
                                    4,
                                    _this.ModelTesisProject.findOne(filter).populate("student", "name lastname").populate("tutors", "name lastname")
                                ];
                            case 2:
                                studentProject = _state.sent();
                                if (!studentProject) {
                                    throw new Error("No tesis project found for the given student ID");
                                }
                                // Format and return a single project
                                return [
                                    2,
                                    _this.formatPopulatedTesisResponse(studentProject)
                                ];
                            case 3:
                                filter.tutors = memberId;
                                return [
                                    4,
                                    _this.ModelTesisProject.find(filter).populate("student", "name lastname").populate("tutors", "name lastname")
                                ];
                            case 4:
                                professorProjects = _state.sent();
                                if (!professorProjects || professorProjects.length === 0) {
                                    return [
                                        2,
                                        []
                                    ];
                                }
                                // Map and format the response for multiple projects
                                return [
                                    2,
                                    professorProjects.map(function(project) {
                                        return _this.formatPopulatedTesisResponse(project);
                                    })
                                ];
                            case 5:
                                throw new Error("Invalid member type");
                            case 6:
                                return [
                                    3,
                                    8
                                ];
                            case 7:
                                error = _state.sent();
                                throw error;
                            case 8:
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
            value: function approveTesisProject(projectId, recoms, uid) {
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
                                        status: TesisProjectStatus.Approved,
                                        approval: {
                                            isApprove: true,
                                            recommendations: recoms,
                                            approvedBy: uid
                                        }
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
                                    }).populate("student", "name lastname").populate("tutors", "name lastname")
                                ];
                            case 1:
                                updatedTesisProject = _state.sent();
                                if (!updatedTesisProject) {
                                    throw new Error("Error updating tesis project");
                                }
                                return [
                                    2,
                                    _this.formatPopulatedTesisResponse(updatedTesisProject)
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
            key: "buildStatusFilter",
            value: function buildStatusFilter(active) {
                var filter = {};
                switch(active){
                    case "true":
                        filter = {
                            $and: [
                                {
                                    status: {
                                        $in: [
                                            TesisProjectStatus.Pending,
                                            TesisProjectStatus.Approved
                                        ]
                                    },
                                    ancient: false
                                }
                            ]
                        };
                        break;
                    case "false":
                        filter = {
                            ancient: true
                        };
                        break;
                    default:
                        break;
                }
                return filter;
            }
        },
        {
            key: "formatPopulatedTesisResponse",
            value: // Helper method to format the response
            function formatPopulatedTesisResponse(tesisProject) {
                var _student__id;
                var _tesisProject_toObject = tesisProject.toObject(), __v = _tesisProject_toObject.__v, _id = _tesisProject_toObject._id, id = _tesisProject_toObject.id, student = _tesisProject_toObject.student, tutors = _tesisProject_toObject.tutors, rest = _object_without_properties(_tesisProject_toObject, [
                    "__v",
                    "_id",
                    "id",
                    "student",
                    "tutors"
                ]);
                // Format the "id" field for the student
                var formattedStudent = {
                    id: (student === null || student === void 0 ? void 0 : (_student__id = student._id) === null || _student__id === void 0 ? void 0 : _student__id.toString()) || null,
                    name: (student === null || student === void 0 ? void 0 : student.name) || null,
                    lastname: (student === null || student === void 0 ? void 0 : student.lastname) || null
                };
                // Format the "id" field for each tutor
                var formattedTutors = (tutors === null || tutors === void 0 ? void 0 : tutors.map(function(tutor) {
                    var _tutor__id;
                    return {
                        id: (tutor === null || tutor === void 0 ? void 0 : (_tutor__id = tutor._id) === null || _tutor__id === void 0 ? void 0 : _tutor__id.toString()) || null,
                        name: (tutor === null || tutor === void 0 ? void 0 : tutor.name) || null,
                        lastname: (tutor === null || tutor === void 0 ? void 0 : tutor.lastname) || null
                    };
                })) || [];
                // Build the formatted response
                var formattedResponse = _object_spread({
                    id: _id.toString(),
                    student: formattedStudent,
                    tutors: formattedTutors
                }, rest);
                return formattedResponse;
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
            key: "getTotalProjectsStatus",
            value: function getTotalProjectsStatus() {
                return _async_to_generator(function() {
                    var _ref, totalProjects, defendedProjects, activeProjects, approvedProjects, pendingProjects, error;
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
                                    Promise.all([
                                        ModelTesisProject.countDocuments(),
                                        ModelTesisProject.countDocuments({
                                            ancient: true
                                        }),
                                        ModelTesisProject.find({
                                            ancient: false
                                        })
                                    ])
                                ];
                            case 1:
                                _ref = _sliced_to_array.apply(void 0, [
                                    _state.sent(),
                                    3
                                ]), totalProjects = _ref[0], defendedProjects = _ref[1], activeProjects = _ref[2];
                                // Count approved and pending projects among active projects
                                approvedProjects = activeProjects.filter(function(project) {
                                    var _project_approval;
                                    return ((_project_approval = project.approval) === null || _project_approval === void 0 ? void 0 : _project_approval.isApprove) === true;
                                }).length;
                                pendingProjects = activeProjects.filter(function(project) {
                                    var _project_approval;
                                    return ((_project_approval = project.approval) === null || _project_approval === void 0 ? void 0 : _project_approval.isApprove) === false || !project.approval;
                                }).length;
                                return [
                                    2,
                                    {
                                        totalProjects: totalProjects,
                                        defendedProjects: defendedProjects,
                                        activeProjects: {
                                            total: activeProjects.length,
                                            approved: approvedProjects,
                                            pending: pendingProjects
                                        }
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                console.error("Error retrieving projects stadistics:", error);
                                throw error;
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
