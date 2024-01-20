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
import { handleResponse } from "./../middleware/handleResponse.js";
import MinioService from "../services/MinioService.js";
import { matchedData } from "express-validator";
import { DefenseService } from "../services/Defense.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { BucketsS3 } from "../const.js";
import * as AdmZip from "adm-zip";
export var FilesController = {
    getFile: function getFile(req, res) {
        return _async_to_generator(function() {
            var _matchedData, bucket, filename, bufferData, error;
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
                        }), bucket = _matchedData.bucket, filename = _matchedData.filename;
                        return [
                            4,
                            MinioService.getInstance().getFile(bucket, filename)
                        ];
                    case 1:
                        bufferData = _state.sent();
                        if (bufferData !== null) {
                            // Set response headers
                            res.setHeader("Content-Type", "application/pdf");
                            res.setHeader("Content-Disposition", "attachment; filename=".concat(filename));
                            // Send the file data as the response
                            res.status(200).send(bufferData);
                        } else {
                            // Handle the case when bufferData is null (e.g., send an error response)
                            res.status(404).json({
                                error: "File not found"
                            });
                        }
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        // Handle other errors (e.g., log and send an error response)
                        console.error(error);
                        res.status(500).json({
                            error: "Internal server error"
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
    },
    getRarTesisInfo: function getRarTesisInfo(req, res) {
        return _async_to_generator(function() {
            var id, defense, err, doc_url, pres_url, regex, doc_match, doc_name, pres_match, pres_name, minioInstance, _ref, docBuffer, presBuffer, zip, zipBuffer, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            4,
                            ,
                            5
                        ]);
                        id = matchedData(req, {
                            locations: [
                                "params"
                            ]
                        }).id;
                        return [
                            4,
                            DefenseService.getDefenseById(id)
                        ];
                    case 1:
                        defense = _state.sent();
                        if (!defense) {
                            err = ErrorHandlerFactory.createError(new Error("Defense not found"));
                            return [
                                2,
                                handleResponse({
                                    res: res,
                                    statusCode: 404,
                                    error: err
                                })
                            ];
                        }
                        // TODO: Get the links of the doc and the pres file
                        doc_url = defense.doc_url, pres_url = defense.pres_url;
                        console.log(doc_url, pres_url);
                        // Define a regular expression to match the pattern
                        regex = /\/api\/files\/(\w+)\/([\w-]+\.pdf|[\w-]+\.pptx)/;
                        // Use the regex to extract the values for doc_url
                        doc_match = doc_url.match(regex);
                        doc_name = doc_match ? doc_match[2] : null;
                        // Use the regex to extract the values for pres_url
                        pres_match = pres_url.match(regex);
                        pres_name = pres_match ? pres_match[2] : null;
                        if (!(doc_name && pres_name)) return [
                            3,
                            3
                        ];
                        minioInstance = MinioService.getInstance();
                        return [
                            4,
                            Promise.all([
                                minioInstance.getFile(BucketsS3.AcademicDocs, doc_name),
                                minioInstance.getFile(BucketsS3.AcademicDocs, pres_name)
                            ])
                        ];
                    case 2:
                        _ref = _sliced_to_array.apply(void 0, [
                            _state.sent(),
                            2
                        ]), docBuffer = _ref[0], presBuffer = _ref[1];
                        if (docBuffer && presBuffer) {
                            // Create a .zip file using adm-zip
                            zip = new AdmZip.default();
                            zip.addFile(doc_name, docBuffer, "Document");
                            zip.addFile(pres_name, presBuffer, "Presentation");
                            zipBuffer = zip.toBuffer();
                            // Set the response headers for a zip file
                            res.setHeader("Content-Type", "application/zip");
                            res.setHeader("Content-Disposition", "attachment; filename=tesis.zip");
                            // TODO: End the response and send the zip
                            // Send the zip file as the response
                            res.end(zipBuffer);
                        }
                        _state.label = 3;
                    case 3:
                        return [
                            3,
                            5
                        ];
                    case 4:
                        error = _state.sent();
                        // Handle other errors (e.g., log and send an error response)
                        console.error(error);
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
        })();
    }
};
