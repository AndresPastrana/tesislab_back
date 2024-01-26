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
import { ModelSubmission } from "../models/Submission.js";
import { ModelEvaluation } from "../models/Evaluations.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { matchedData } from "express-validator";
import { readAppTypeKeywords } from "../helpers/others.js";
export var getStudentHistory = function() {
    var _ref = _async_to_generator(function(req, res) {
        var _matchedData, _matchedData_id, id, student, submissions, evalInfoPromises, evalInfoResolved, mapedSubmissions, history, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        4,
                        ,
                        5
                    ]);
                    _matchedData = matchedData(req, {
                        locations: [
                            "params"
                        ]
                    }), _matchedData_id = _matchedData.id, id = _matchedData_id === void 0 ? null : _matchedData_id;
                    return [
                        4,
                        ModelStudent.findById(id).exec()
                    ];
                case 1:
                    student = _state.sent();
                    if (!student) {
                        return [
                            2,
                            res.status(404).json({
                                error: "Student not found"
                            })
                        ];
                    }
                    return [
                        4,
                        ModelSubmission.find({
                            student_id: id
                        }).sort({
                            updatedAt: -1
                        }).exec()
                    ];
                case 2:
                    submissions = _state.sent();
                    evalInfoPromises = submissions.map(function() {
                        var _ref = _async_to_generator(function(submission) {
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            ModelEvaluation.findById(submission.evaluation_id).select("type updatedAt createdAt")
                                        ];
                                    case 1:
                                        return [
                                            2,
                                            _state.sent()
                                        ];
                                }
                            });
                        });
                        return function(submission) {
                            return _ref.apply(this, arguments);
                        };
                    }());
                    return [
                        4,
                        Promise.all(evalInfoPromises)
                    ];
                case 3:
                    evalInfoResolved = _state.sent();
                    mapedSubmissions = submissions.map(function(s) {
                        var evalauation = evalInfoResolved.find(function(ev) {
                            return (ev === null || ev === void 0 ? void 0 : ev._id.toString()) === s.evaluation_id.toString();
                        });
                        if (!evalauation) {
                            throw new Error("Invalid eval id");
                        }
                        return {
                            type: evalauation.type,
                            updatedAt: s.updatedAt,
                            score: s.score || null,
                            file: s.file || null,
                            recoms: s.recoms || null
                        };
                    });
                    history = {
                        evaluaciones: mapedSubmissions
                    };
                    // TODO: Return  just the evaluation type , with the updatedAt Date, the socore and the score of the subition if has any
                    return [
                        2,
                        handleResponse({
                            data: history,
                            res: res,
                            statusCode: 200
                        })
                    ];
                case 4:
                    error = _state.sent();
                    console.error("Error fetching student history:", error);
                    res.status(500).json({
                        error: "Internal server error"
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
    return function getStudentHistory(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var getKeywords = function() {
    var _ref = _async_to_generator(function(req, res) {
        var app, keyWords;
        return _ts_generator(this, function(_state) {
            try {
                app = req.body.app;
                keyWords = readAppTypeKeywords(app);
                if (keyWords) {
                    return [
                        2,
                        handleResponse({
                            res: res,
                            data: _define_property({}, app, keyWords),
                            statusCode: 200
                        })
                    ];
                }
                return [
                    2,
                    handleResponse({
                        res: res,
                        data: app,
                        statusCode: 200
                    })
                ];
            } catch (error) {
                console.log(error);
            }
            return [
                2
            ];
        });
    });
    return function getKeywords(req, res) {
        return _ref.apply(this, arguments);
    };
}();
