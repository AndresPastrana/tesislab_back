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
import { ModelDefense } from "../models/Defensa.js"; // Adjust the path to your Defense model
import { ModelTesisProject } from "../models/TesisProject.js";
export var DefenseService = /*#__PURE__*/ function() {
    "use strict";
    function DefenseService() {
        _class_call_check(this, DefenseService);
    }
    _create_class(DefenseService, null, [
        {
            key: "createDefense",
            value: function createDefense(defenseData, courtId) {
                var _this = this;
                return _async_to_generator(function() {
                    var proyect_id, doc_url, pres_url, recomns, evaluation, proyect_info, tutorsRefactorArray, createdDefense, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                proyect_id = defenseData.proyect_id, doc_url = defenseData.doc_url, pres_url = defenseData.pres_url, recomns = defenseData.recomns, evaluation = defenseData.eval;
                                return [
                                    4,
                                    ModelTesisProject.findById(proyect_id).select("student tutors").populate("student", "name lastname").populate("tutors", "name lastname")
                                ];
                            case 1:
                                proyect_info = _state.sent();
                                // TODO: map the result to get the tutors as an array of a single string bt tutors
                                tutorsRefactorArray = proyect_info.tutors.map(function(t) {
                                    var fullName = "";
                                    return fullName.concat(t.name, " ", t.lastname);
                                });
                                _state.label = 2;
                            case 2:
                                _state.trys.push([
                                    2,
                                    4,
                                    ,
                                    5
                                ]);
                                return [
                                    4,
                                    _this.Defense.create(defenseData)
                                ];
                            case 3:
                                createdDefense = _state.sent();
                                return [
                                    2,
                                    createdDefense.toObject()
                                ];
                            case 4:
                                error = _state.sent();
                                throw new Error("Error in defense service , ".concat(error.message));
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
            key: "getReportInfo",
            value: // TODO:
            // student name
            //tutores o tutor
            // tribunal
            function getReportInfo() {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2
                        ];
                    });
                })();
            }
        }
    ]);
    return DefenseService;
}();
_define_property(DefenseService, "Defense", ModelDefense);
