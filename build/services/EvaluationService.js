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
import { ModelEvaluation } from "../models/Evaluations.js";
import { ModelSubmission } from "../models/Submission.js";
/**
 * Service class for handling evaluations and submissions.
 */ export var EvaluationService = /*#__PURE__*/ function() {
    "use strict";
    function EvaluationService() {
        _class_call_check(this, EvaluationService);
    }
    _create_class(EvaluationService, null, [
        {
            key: "createEvaluation",
            value: /**
   * Create a new evaluation.
   * @param evaluationData - Data for creating the evaluation.
   * @returns Created evaluation document.
   */ function createEvaluation(evaluationData) {
                var _this = this;
                return _async_to_generator(function() {
                    var newEvaluation, error;
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
                                    _this.modelEvaluation.create(evaluationData)
                                ];
                            case 1:
                                newEvaluation = _state.sent();
                                return [
                                    2,
                                    newEvaluation
                                ];
                            case 2:
                                error = _state.sent();
                                if (error.name === "ValidationError") {
                                    throw new Error("Validation Error: ".concat(error.message));
                                } else {
                                    throw new Error("Error creating evaluation: ".concat(error.message));
                                }
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
            value: /**
   * Get all submissions by evaluation ID.
   * @param evaluationId - ID of the evaluation.
   * @returns Array of submission documents.
   */ function getAllSubmissionsByEvaluationId(evaluationId) {
                var _this = this;
                return _async_to_generator(function() {
                    var submissions, error;
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
                                    _this.modelSubmission.find({
                                        evaluation_id: evaluationId
                                    }).exec()
                                ];
                            case 1:
                                submissions = _state.sent();
                                return [
                                    2,
                                    submissions
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error getting submissions by evaluation ID: ".concat(error.message));
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
            value: /**
   * Edit an existing evaluation.
   * @param evaluationId - ID of the evaluation to edit.
   * @param updatedData - Updated data for the evaluation.
   * @returns Updated evaluation document or null if not found.
   */ function editEvaluation(evaluationId, updatedData) {
                var _this = this;
                return _async_to_generator(function() {
                    var updatedEvaluation, error;
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
                                    _this.modelEvaluation.findByIdAndUpdate(evaluationId, updatedData, {
                                        new: true
                                    }).exec()
                                ];
                            case 1:
                                updatedEvaluation = _state.sent();
                                if (!updatedEvaluation) {
                                    throw new Error("Evaluation with ID ".concat(evaluationId, " not found"));
                                }
                                return [
                                    2,
                                    updatedEvaluation
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error editing evaluation: ".concat(error.message));
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
            value: /**
   * Get the student's submission of an especific evaluation.
   * @param studentId - ID of the student.
   *  @param eval_id - ID of the evaluation.
   * @returns A submission document.
   */ function getStudentSubmission(studentId, eval_id) {
                var _this = this;
                return _async_to_generator(function() {
                    var submission, error;
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
                                    _this.modelSubmission.findOne({
                                        student_id: studentId,
                                        evaluation_id: eval_id
                                    }).exec()
                                ];
                            case 1:
                                submission = _state.sent();
                                if (!submission) {
                                    throw new Error("Submission not found");
                                }
                                return [
                                    2,
                                    submission
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error getting submissions by student ID: ".concat(error.message));
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
            key: "getAllEvaluations",
            value: /**
   * Get all evaluations.
   * @returns Array of evaluation documents.
   */ function getAllEvaluations() {
                var _this = this;
                return _async_to_generator(function() {
                    var evaluations, error;
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
                                    _this.modelEvaluation.find().exec()
                                ];
                            case 1:
                                evaluations = _state.sent();
                                return [
                                    2,
                                    evaluations
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error getting all evaluations: ".concat(error.message));
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
            value: // Submissions
            /**
   * Create a new submission for a specific evaluation.
   * @param submissionData - Data for creating the submission.
   * @returns Created submission document.
   */ function createSubmission(submissionData) {
                var _this = this;
                return _async_to_generator(function() {
                    var newSubmission, error;
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
                                    _this.modelSubmission.create(submissionData)
                                ];
                            case 1:
                                newSubmission = _state.sent();
                                return [
                                    2,
                                    newSubmission
                                ];
                            case 2:
                                error = _state.sent();
                                if (error.name === "ValidationError") {
                                    throw new Error("Validation Error: ".concat(error.message));
                                } else {
                                    throw new Error("Error creating submission: ".concat(error.message));
                                }
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
            key: "editSubmission",
            value: /**
   * Edit an existing submission.
   * @param submissionId - ID of the submission to edit.
   * @param updatedData - Updated data for the submission.
   * @returns Updated submission document or null if not found.
   */ function editSubmission(submissionId, updatedData) {
                var _this = this;
                return _async_to_generator(function() {
                    var updatedSubmission, error;
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
                                    _this.modelSubmission.findByIdAndUpdate(submissionId, updatedData, {
                                        new: true
                                    }).exec()
                                ];
                            case 1:
                                updatedSubmission = _state.sent();
                                if (!updatedSubmission) {
                                    throw new Error("Submission with ID ".concat(submissionId, " not found"));
                                }
                                return [
                                    2,
                                    updatedSubmission
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error editing submission: ".concat(error.message));
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
    return EvaluationService;
}();
_define_property(EvaluationService, "modelEvaluation", ModelEvaluation);
_define_property(EvaluationService, "modelSubmission", ModelSubmission);
