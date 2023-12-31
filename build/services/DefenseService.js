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
import { UserRole } from "../const.js";
import { ModelDefense } from "../models/Defensa.js";
import { TesisProjectService } from "./TesisProject.js";
export var DefenseService = /*#__PURE__*/ function() {
    "use strict";
    function DefenseService() {
        _class_call_check(this, DefenseService);
    }
    _create_class(DefenseService, null, [
        {
            key: "createDefense",
            value: /**
   * Creates a new defense record based on the provided data.
   *
   * @param {Object} defenseData - Data for creating the defense record.
   * @param {Schema.Types.ObjectId} defenseData.studentId - ID of the student.
   * @param {string[]} defenseData.key_words - Keywords associated with the defense.
   * @param {string} defenseData.recoms - Recommendations from the defense.
   * @param {number} defenseData.evaluation - Evaluation score for the defense.
   * @param {string} defenseData.doc_url - URL of the document related to the defense.
   * @param {string} defenseData.pres_url - URL of the presentation related to the defense.
   * @param {string[]} defenseData.court - Names of the court members.
   * @throws {Error} Throws an error if there's an issue creating the defense.
   */ function createDefense(defenseData) {
                return _async_to_generator(function() {
                    var studentId, key_words, recoms, evaluation, doc_url, pres_url, court, project_info, general_target, functional_requirements, scientific_problem, topic, student, tutors, tutors_names, student_name, newDefense, createdDefense, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    3,
                                    ,
                                    4
                                ]);
                                studentId = defenseData.studentId, key_words = defenseData.key_words, recoms = defenseData.recoms, evaluation = defenseData.evaluation, doc_url = defenseData.doc_url, pres_url = defenseData.pres_url, court = defenseData.court;
                                return [
                                    4,
                                    TesisProjectService.getProjectsByMemberId("true", studentId, UserRole.Student)
                                ];
                            case 1:
                                project_info = _state.sent();
                                general_target = project_info.general_target, functional_requirements = project_info.functional_requirements, scientific_problem = project_info.scientific_problem, topic = project_info.topic, student = project_info.student, tutors = project_info.tutors;
                                // Extract names from tutors
                                tutors_names = tutors.map(function(t) {
                                    return t.name.concat(" ").concat(t.lastname);
                                });
                                student_name = student.name.concat(" ").concat(student.lastname);
                                // Create a new Defense
                                newDefense = {
                                    doc_url: doc_url,
                                    pres_url: pres_url,
                                    metadata: {
                                        general_target: general_target,
                                        functional_requirements: functional_requirements,
                                        topic: topic,
                                        tutors: tutors_names,
                                        student: student_name,
                                        court: court,
                                        key_words: key_words,
                                        scientific_problem: scientific_problem
                                    },
                                    eval: evaluation,
                                    recomns: recoms,
                                    date: new Date()
                                };
                                return [
                                    4,
                                    ModelDefense.create(newDefense)
                                ];
                            case 2:
                                createdDefense = _state.sent();
                                // Log the created defense
                                console.log("Created Defense:", createdDefense);
                                return [
                                    3,
                                    4
                                ];
                            case 3:
                                error = _state.sent();
                                // Log the error for debugging purposes
                                console.error("Error creating defense:", error);
                                // Rethrow the error with a specific message
                                throw new Error("Error creating defense: ".concat(error.message));
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
    return DefenseService;
}();
