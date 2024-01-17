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
import { matchedData } from "express-validator";
import { EvaluationService } from "../services/EvaluationService.js";
import { handleResponse } from "../middleware/handleResponse.js"; // Update the path accordingly
import { ErrorHandlerFactory } from "../errors/error.js";
import { BucketsS3 } from "../const.js";
import { uploadFile } from "../helpers/minio.js";
import { validateEditSubmissionFields } from "../helpers/others.js";
export var EvaluationController = /*#__PURE__*/ function() {
    "use strict";
    function EvaluationController() {
        _class_call_check(this, EvaluationController);
    }
    _create_class(EvaluationController, null, [
        {
            key: "getAllEvaluations",
            value: // Get all evaluations
            function getAllEvaluations(req, res) {
                return _async_to_generator(function() {
                    var evaluations, error, customError;
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
                                    EvaluationService.getAllEvaluations()
                                ];
                            case 1:
                                evaluations = _state.sent();
                                handleResponse({
                                    statusCode: 200,
                                    data: evaluations,
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
                })();
            }
        },
        {
            key: "createEvaluation",
            value: // Create a new evaluation
            function createEvaluation(req, res) {
                return _async_to_generator(function() {
                    var evaluationData, createdEvaluation, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                evaluationData = matchedData(req);
                                return [
                                    4,
                                    EvaluationService.createEvaluation(evaluationData)
                                ];
                            case 1:
                                createdEvaluation = _state.sent();
                                handleResponse({
                                    statusCode: 201,
                                    data: createdEvaluation,
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
                })();
            }
        },
        {
            key: "getAllSubmissionsByEvaluationId",
            value: // Get all submissions by evaluation ID
            function getAllSubmissionsByEvaluationId(req, res) {
                return _async_to_generator(function() {
                    var _matchedData, evaluationId, submissions, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                _matchedData = matchedData(req, {
                                    locations: [
                                        "params"
                                    ]
                                }), evaluationId = _matchedData.id; // Assuming the evaluation ID is in the route params
                                return [
                                    4,
                                    EvaluationService.getAllSubmissionsByEvaluationId(evaluationId)
                                ];
                            case 1:
                                submissions = _state.sent();
                                handleResponse({
                                    statusCode: 200,
                                    data: submissions,
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
                })();
            }
        },
        {
            key: "editEvaluation",
            value: // Edit an existing evaluation
            function editEvaluation(req, res) {
                return _async_to_generator(function() {
                    var evaluationId, updatedData, updatedEvaluation, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                evaluationId = req.params.evaluationId; // Assuming the evaluation ID is in the route params
                                updatedData = matchedData(req);
                                return [
                                    4,
                                    EvaluationService.editEvaluation(evaluationId, updatedData)
                                ];
                            case 1:
                                updatedEvaluation = _state.sent();
                                if (updatedEvaluation) {
                                    handleResponse({
                                        statusCode: 200,
                                        data: updatedEvaluation,
                                        res: res
                                    });
                                } else {
                                    handleResponse({
                                        statusCode: 404,
                                        error: {
                                            name: "NotFoundError",
                                            message: "Evaluation with ID ".concat(evaluationId, " not found")
                                        },
                                        res: res
                                    });
                                }
                                return [
                                    3,
                                    3
                                ];
                            case 2:
                                error = _state.sent();
                                customError = ErrorHandlerFactory.createError(error);
                                handleResponse({
                                    statusCode: 500,
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
                })();
            }
        },
        {
            key: "getStudentSubmission",
            value: // Submission
            // Get the submission of an especific evaluation of a student
            function getStudentSubmission(req, res) {
                return _async_to_generator(function() {
                    var _matchedData, eval_id, student_id, submissions, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                _matchedData = matchedData(req, {
                                    locations: [
                                        "params"
                                    ]
                                }), eval_id = _matchedData.eval_id, student_id = _matchedData.student_id; // Assuming the student ID is in the query params
                                return [
                                    4,
                                    EvaluationService.getStudentSubmission(student_id, eval_id)
                                ];
                            case 1:
                                submissions = _state.sent();
                                handleResponse({
                                    statusCode: 200,
                                    data: submissions,
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
                })();
            }
        },
        {
            key: "createSubmission",
            value: // Create a new submission for a specific evaluation
            function createSubmission(req, res) {
                return _async_to_generator(function() {
                    var _req_user, evaluation_id, file, file_url, createdSubmission, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    3,
                                    ,
                                    4
                                ]);
                                evaluation_id = req.body.evaluation_id;
                                file = req.file;
                                if (!file) {
                                    return [
                                        2,
                                        handleResponse({
                                            res: res,
                                            error: ErrorHandlerFactory.createError(new Error("")),
                                            statusCode: 400
                                        })
                                    ];
                                }
                                return [
                                    4,
                                    uploadFile(file, BucketsS3.Evaluaciones)
                                ];
                            case 1:
                                file_url = _state.sent();
                                return [
                                    4,
                                    EvaluationService.createSubmission({
                                        evaluation_id: evaluation_id,
                                        student_id: new Types.ObjectId((_req_user = req.user) === null || _req_user === void 0 ? void 0 : _req_user.userId),
                                        file: file_url
                                    })
                                ];
                            case 2:
                                createdSubmission = _state.sent();
                                return [
                                    2,
                                    handleResponse({
                                        statusCode: 201,
                                        data: createdSubmission,
                                        res: res
                                    })
                                ];
                            case 3:
                                error = _state.sent();
                                console.log(error);
                                customError = ErrorHandlerFactory.createError(error);
                                return [
                                    2,
                                    handleResponse({
                                        statusCode: 500,
                                        error: customError,
                                        res: res
                                    })
                                ];
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "editSubmission",
            value: // Edit an existing submission
            function editSubmission(req, res) {
                return _async_to_generator(function() {
                    var _matchedData, submissionId, body, file, updatedData, validationErrors, updatedSubmission, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                _matchedData = matchedData(req, {
                                    locations: [
                                        "params"
                                    ]
                                }), submissionId = _matchedData.id;
                                // The fileds that can be edited are the "recoms" , "score" , "file"
                                body = req.body;
                                file = req.file;
                                updatedData = _object_spread_props(_object_spread({}, body), {
                                    score: Number(body.score)
                                });
                                console.log("Data");
                                console.log(updatedData);
                                // TODO: Edit the file url
                                // if (file) {
                                //   // TODO: This code can only be executed if the loged user is an student
                                //   //  -Get the previous file name and bucket
                                //   const subInfo = await ModelSubmission.findById(submissionId);
                                //   const parserurl = parseFileUrl(subInfo?.file as string);
                                //   //
                                //   const fileServer = MinioService.getInstance();
                                //   //  -Delete the prev file of the minio server
                                //   await fileServer.deleteFile(parserurl.bucketName, parserurl.objectName);
                                //   //  -Upload the new file and get the url
                                //   const newFileUrl = await uploadFile(file, BucketsS3.Evaluaciones);
                                //   // Appedn the new file to the updated data
                                //   updatedData.file = newFileUrl;
                                // }
                                validationErrors = validateEditSubmissionFields({
                                    recoms: updatedData.recoms,
                                    score: updatedData.score
                                });
                                if (validationErrors.length > 0) {
                                    return [
                                        2,
                                        handleResponse({
                                            statusCode: 400,
                                            error: {
                                                name: "Validation Error",
                                                message: "Errors: ".concat(validationErrors.join(", "))
                                            },
                                            res: res
                                        })
                                    ];
                                }
                                return [
                                    4,
                                    EvaluationService.editSubmission(submissionId, updatedData)
                                ];
                            case 1:
                                updatedSubmission = _state.sent();
                                if (updatedSubmission) {
                                    return [
                                        2,
                                        handleResponse({
                                            statusCode: 200,
                                            data: updatedSubmission,
                                            res: res
                                        })
                                    ];
                                } else {
                                    return [
                                        2,
                                        handleResponse({
                                            statusCode: 404,
                                            error: {
                                                name: "NotFoundError",
                                                message: "Submission with ID ".concat(submissionId, " not found")
                                            },
                                            res: res
                                        })
                                    ];
                                }
                                return [
                                    3,
                                    3
                                ];
                            case 2:
                                error = _state.sent();
                                customError = ErrorHandlerFactory.createError(error);
                                handleResponse({
                                    statusCode: 500,
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
                })();
            }
        },
        {
            key: "getAllEvaluationsWithSub",
            value: // Get all evaluations and their corresponding submissions for a given student
            function getAllEvaluationsWithSub(req, res) {
                return _async_to_generator(function() {
                    var student_id, evaluationSubmissions, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                student_id = matchedData(req, {
                                    locations: [
                                        "params"
                                    ]
                                }).student_id; // Assuming the student ID is in the query params
                                console.log(student_id);
                                return [
                                    4,
                                    EvaluationService.getAllEvaluationsWithSub(student_id)
                                ];
                            case 1:
                                evaluationSubmissions = _state.sent();
                                handleResponse({
                                    statusCode: 200,
                                    data: evaluationSubmissions,
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
                })();
            }
        }
    ]);
    return EvaluationController;
}();
