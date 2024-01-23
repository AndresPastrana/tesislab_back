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
import { AcademicRankModel } from "../models/AcademicRankModel.js";
var AcademicRankService = /*#__PURE__*/ function() {
    "use strict";
    function AcademicRankService() {
        _class_call_check(this, AcademicRankService);
    }
    _create_class(AcademicRankService, null, [
        {
            key: "validateUniqueness",
            value: // ...
            // Validate uniqueness before saving or updating
            function validateUniqueness(rank, currentRankId) {
                return _async_to_generator(function() {
                    var existingRank;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    AcademicRankModel.findOne({
                                        rank: rank
                                    })
                                ];
                            case 1:
                                existingRank = _state.sent();
                                if (existingRank && existingRank._id.toString() !== currentRankId) {
                                    throw new Error("Academic rank '".concat(rank, "' already exists."));
                                }
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
            value: // Get all academic ranks
            function getAllAcademicRanks() {
                return _async_to_generator(function() {
                    var ranks, error;
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
                                    AcademicRankModel.find()
                                ];
                            case 1:
                                ranks = _state.sent();
                                return [
                                    2,
                                    ranks
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error getting academic ranks: ".concat(error));
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
            value: // Get academic rank by ID
            function getAcademicRankById(id) {
                return _async_to_generator(function() {
                    var rank, error;
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
                                    AcademicRankModel.findById(id)
                                ];
                            case 1:
                                rank = _state.sent();
                                return [
                                    2,
                                    rank
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error getting academic rank by ID: ".concat(error));
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
            key: "createAcademicRank",
            value: // Create a new academic rank
            function createAcademicRank(rank) {
                return _async_to_generator(function() {
                    var newRank, savedRank, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    3,
                                    ,
                                    4
                                ]);
                                return [
                                    4,
                                    AcademicRankService.validateUniqueness(rank)
                                ];
                            case 1:
                                _state.sent();
                                newRank = new AcademicRankModel({
                                    rank: rank
                                });
                                return [
                                    4,
                                    newRank.save()
                                ];
                            case 2:
                                savedRank = _state.sent();
                                return [
                                    2,
                                    savedRank
                                ];
                            case 3:
                                error = _state.sent();
                                throw new Error("Error creating academic rank: ".concat(error));
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
            key: "updateAcademicRank",
            value: // Update academic rank by ID
            function updateAcademicRank(id, updatedRank) {
                return _async_to_generator(function() {
                    var currentRank, rank, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    4,
                                    ,
                                    5
                                ]);
                                return [
                                    4,
                                    AcademicRankModel.findById(id)
                                ];
                            case 1:
                                currentRank = _state.sent();
                                if (!currentRank) {
                                    throw new Error("Academic rank with ID '".concat(id, "' not found."));
                                }
                                return [
                                    4,
                                    AcademicRankService.validateUniqueness(updatedRank.rank, id)
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    AcademicRankModel.findByIdAndUpdate(id, updatedRank, {
                                        new: true
                                    })
                                ];
                            case 3:
                                rank = _state.sent();
                                return [
                                    2,
                                    rank
                                ];
                            case 4:
                                error = _state.sent();
                                throw new Error("Error updating academic rank: ".concat(error));
                            case 5:
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
            value: // Delete academic rank by ID
            function deleteAcademicRank(id) {
                return _async_to_generator(function() {
                    var error;
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
                                    AcademicRankModel.findByIdAndDelete(id)
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    3,
                                    3
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error deleting academic rank: ".concat(error));
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
    return AcademicRankService;
}();
export default AcademicRankService;
