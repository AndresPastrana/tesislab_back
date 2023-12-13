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
import { ModelCourt } from "./../models/Court.js";
export var CourtsService = /*#__PURE__*/ function() {
    "use strict";
    function CourtsService() {
        _class_call_check(this, CourtsService);
    }
    _create_class(CourtsService, null, [
        {
            key: "isRoleUniqueWithinCourt",
            value: //TODO: Get all courts info with the professor populated info
            function isRoleUniqueWithinCourt(courtId, role) {
                var _this = this;
                return _async_to_generator(function() {
                    var existingCourt;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.CourtModel.findOne({
                                        _id: courtId,
                                        "members.role": role
                                    })
                                ];
                            case 1:
                                existingCourt = _state.sent();
                                return [
                                    2,
                                    !existingCourt
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createCourt",
            value: function createCourt(courtData) {
                var _this = this;
                return _async_to_generator(function() {
                    var createdCourt, error;
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
                                    _this.CourtModel.create(courtData)
                                ];
                            case 1:
                                createdCourt = _state.sent();
                                return [
                                    2,
                                    createdCourt.toObject()
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error in the Court Service: ".concat(error.message));
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
            key: "getAllCourts",
            value: function getAllCourts() {
                var _this = this;
                return _async_to_generator(function() {
                    var courts, error;
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
                                    _this.CourtModel.find().populate({
                                        path: "members.profesor",
                                        model: "Profesor",
                                        select: "name lastname"
                                    }).exec()
                                ];
                            case 1:
                                courts = _state.sent();
                                return [
                                    2,
                                    courts ? courts.map(function(court) {
                                        return court.toJSON();
                                    }) : null
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error in the Court Service: ".concat(error.message));
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
            key: "editCourt",
            value: function editCourt(courtId, courtData) {
                var _this = this;
                return _async_to_generator(function() {
                    var isUnique, updatedCourt, error;
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
                                    _this.isRoleUniqueWithinCourt(courtId, courtData.members[0].role)
                                ];
                            case 1:
                                isUnique = _state.sent();
                                if (!isUnique) {
                                    throw new Error("Error in the Court Service: Role must be unique within the court");
                                }
                                return [
                                    4,
                                    _this.CourtModel.findByIdAndUpdate(courtId, courtData, {
                                        new: true
                                    })
                                ];
                            case 2:
                                updatedCourt = _state.sent();
                                return [
                                    2,
                                    updatedCourt ? updatedCourt.toObject() : null
                                ];
                            case 3:
                                error = _state.sent();
                                throw new Error("Error in the Court Service: ".concat(error.message));
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
            key: "getCourtInfoById",
            value: function getCourtInfoById(courtId) {
                var _this = this;
                return _async_to_generator(function() {
                    var court, error;
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
                                    _this.CourtModel.findById(courtId).populate({
                                        path: "members.profesor",
                                        model: "Profesor",
                                        select: "name lastname"
                                    }).exec()
                                ];
                            case 1:
                                court = _state.sent();
                                return [
                                    2,
                                    court ? court.toObject() : null
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error in the Court Service: ".concat(error.message));
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
            key: "removeCourt",
            value: function removeCourt(courtId) {
                var _this = this;
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
                                    _this.CourtModel.findByIdAndDelete(courtId)
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    3,
                                    3
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("Error in the Court Service: ".concat(error.message));
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
    return CourtsService;
}();
_define_property(CourtsService, "CourtModel", ModelCourt);
