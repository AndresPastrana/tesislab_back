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
import AcademicRankService from "../services/AcademicRankService.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { matchedData } from "express-validator";
var AcademicRankController = /*#__PURE__*/ function() {
    "use strict";
    function AcademicRankController() {
        _class_call_check(this, AcademicRankController);
    }
    _create_class(AcademicRankController, null, [
        {
            key: "createAcademicRank",
            value: function createAcademicRank(req, res) {
                return _async_to_generator(function() {
                    var rank, createdRank, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                rank = matchedData(req, {
                                    locations: [
                                        "body"
                                    ]
                                }).rank;
                                return [
                                    4,
                                    AcademicRankService.createAcademicRank(rank)
                                ];
                            case 1:
                                createdRank = _state.sent();
                                handleResponse({
                                    statusCode: 201,
                                    msg: "Academic rank created successfully",
                                    data: createdRank,
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
                                    msg: "Error creating academic rank",
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
            key: "getAllAcademicRanks",
            value: function getAllAcademicRanks(req, res) {
                return _async_to_generator(function() {
                    var allRanks, error, customError;
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
                                    AcademicRankService.getAllAcademicRanks()
                                ];
                            case 1:
                                allRanks = _state.sent();
                                handleResponse({
                                    statusCode: 200,
                                    msg: "Academic ranks retrieved successfully",
                                    data: allRanks,
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
                                    msg: "Error getting academic ranks",
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
            key: "getAcademicRankById",
            value: function getAcademicRankById(req, res) {
                return _async_to_generator(function() {
                    var rankId, rank, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                rankId = req.params.id;
                                return [
                                    4,
                                    AcademicRankService.getAcademicRankById(rankId)
                                ];
                            case 1:
                                rank = _state.sent();
                                if (rank) {
                                    handleResponse({
                                        statusCode: 200,
                                        msg: "Academic rank retrieved successfully",
                                        data: rank,
                                        res: res
                                    });
                                } else {
                                    handleResponse({
                                        statusCode: 404,
                                        msg: "Academic rank not found",
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
                                    msg: "Error getting academic rank by ID",
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
            key: "updateAcademicRank",
            value: function updateAcademicRank(req, res) {
                return _async_to_generator(function() {
                    var rank, updatedRank, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                rank = req.body.rank;
                                return [
                                    4,
                                    AcademicRankService.updateAcademicRank(req.params.id, {
                                        rank: rank
                                    })
                                ];
                            case 1:
                                updatedRank = _state.sent();
                                if (updatedRank) {
                                    handleResponse({
                                        statusCode: 200,
                                        msg: "Academic rank updated successfully",
                                        data: updatedRank,
                                        res: res
                                    });
                                } else {
                                    handleResponse({
                                        statusCode: 404,
                                        msg: "Academic rank not found",
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
                                    msg: "Error updating academic rank",
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
            key: "deleteAcademicRank",
            value: function deleteAcademicRank(req, res) {
                return _async_to_generator(function() {
                    var rankId, error, customError;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                rankId = req.params.id;
                                return [
                                    4,
                                    AcademicRankService.deleteAcademicRank(rankId)
                                ];
                            case 1:
                                _state.sent();
                                handleResponse({
                                    statusCode: 204,
                                    msg: "Academic rank deleted successfully",
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
                                    msg: "Error deleting academic rank",
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
    return AcademicRankController;
}();
export default AcademicRankController;
