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
import { BucketsS3 } from "../const.js";
import { uploadFile } from "../helpers/minio.js"; // Import the uploadFile function
import { matchedData } from "express-validator";
import { DefenseService } from "../services/Defense.js";
import { handleResponse } from "../middleware/handleResponse.js";
export var DefenseController = /*#__PURE__*/ function() {
    "use strict";
    function DefenseController() {
        _class_call_check(this, DefenseController);
    }
    _create_class(DefenseController, null, [
        {
            key: "createDefense",
            value: /**
   * Handles the creation of a new defense record.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */ function createDefense(req, res) {
                return _async_to_generator(function() {
                    var data, keyWords, project, recoms, evaluation, court, date, app_type, docFiles, presFiles, oponent_reportFiles, tutor_opinionFiles, doc, pres, report, opinion, _ref, doc_url, pres_url, oponent_report, tutor_opinion, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    3,
                                    ,
                                    4
                                ]);
                                data = req.body;
                                keyWords = data.keyWords, project = data.project, recoms = data.recoms, evaluation = data.evaluation, court = data.court, date = data.date, app_type = data.app_type;
                                console.log(req.files);
                                docFiles = req.files["docFile"];
                                presFiles = req.files["presFile"];
                                oponent_reportFiles = req.files["oponent_report"];
                                tutor_opinionFiles = req.files["tutor_opinion"];
                                // Ensure there is at least one file for each type
                                if (!docFiles || !presFiles || !oponent_reportFiles || !tutor_opinionFiles) {
                                    throw new Error("'docFile' , 'presFile', 'tutor_opinion' , 'oponent_report' are required.");
                                }
                                // Select the first file for each type
                                doc = docFiles[0];
                                pres = presFiles[0];
                                report = oponent_reportFiles[0];
                                opinion = tutor_opinionFiles[0];
                                return [
                                    4,
                                    Promise.all([
                                        uploadFile(doc, BucketsS3.AcademicDocs),
                                        uploadFile(pres, BucketsS3.AcademicDocs),
                                        uploadFile(report, BucketsS3.AcademicDocs),
                                        uploadFile(opinion, BucketsS3.AcademicDocs)
                                    ])
                                ];
                            case 1:
                                _ref = _sliced_to_array.apply(void 0, [
                                    _state.sent(),
                                    4
                                ]), doc_url = _ref[0], pres_url = _ref[1], oponent_report = _ref[2], tutor_opinion = _ref[3];
                                // Call the DefenseService to create a new defense record
                                return [
                                    4,
                                    DefenseService.createDefense({
                                        court: court,
                                        doc_url: doc_url,
                                        pres_url: pres_url,
                                        evaluation: evaluation,
                                        keyWords: keyWords,
                                        project: project,
                                        recoms: recoms,
                                        date: date,
                                        app_type: app_type,
                                        oponent_report: oponent_report,
                                        tutor_opinion: tutor_opinion
                                    })
                                ];
                            case 2:
                                _state.sent();
                                // Send a success response
                                return [
                                    2,
                                    handleResponse({
                                        statusCode: 201,
                                        res: res,
                                        data: null
                                    })
                                ];
                            case 3:
                                error = _state.sent();
                                // Handle errors and send an error response
                                console.error("Error in createDefense controller:", error === null || error === void 0 ? void 0 : error.message);
                                res.status(500).json({
                                    error: "Internal server error"
                                });
                                return [
                                    3,
                                    4
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
            key: "search",
            value: function search(req, res) {
                return _async_to_generator(function() {
                    var _matchedData, _matchedData_query, query, results, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _matchedData = matchedData(req, {
                                    locations: [
                                        "query"
                                    ]
                                }), _matchedData_query = _matchedData.query, query = _matchedData_query === void 0 ? "" : _matchedData_query;
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    3,
                                    ,
                                    4
                                ]);
                                return [
                                    4,
                                    DefenseService.search(query)
                                ];
                            case 2:
                                results = _state.sent();
                                // const results = DefenseService.search(query);
                                return [
                                    2,
                                    handleResponse({
                                        res: res,
                                        statusCode: 200,
                                        data: results
                                    })
                                ];
                            case 3:
                                error = _state.sent();
                                return [
                                    2,
                                    handleResponse({
                                        res: res,
                                        error: null,
                                        statusCode: 500
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
        }
    ]);
    return DefenseController;
}();
