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
import { ModelUser } from "../models/User.js";
import { createJWTAsync } from "../helpers/jwt.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { generateSecurePassword } from "../helpers/hash.js";
export var UserService = /*#__PURE__*/ function() {
    "use strict";
    function UserService() {
        _class_call_check(this, UserService);
    }
    _create_class(UserService, null, [
        {
            key: "loginUser",
            value: function loginUser(param) {
                var username = param.username, password = param.password;
                var _this = this;
                return _async_to_generator(function() {
                    var user, isValidPassword, token, error;
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
                                    _this.ModelUser.findOne({
                                        username: username
                                    })
                                ];
                            case 1:
                                user = _state.sent();
                                if (!user) {
                                    throw ErrorHandlerFactory.createError(new Error("Invalid username or password"));
                                }
                                return [
                                    4,
                                    user.isValidPassword(password)
                                ];
                            case 2:
                                isValidPassword = _state.sent();
                                if (!isValidPassword) {
                                    throw ErrorHandlerFactory.createError(new Error("Invalid username or password"));
                                }
                                return [
                                    4,
                                    createJWTAsync({
                                        userId: user._id,
                                        username: user.username,
                                        role: user.role
                                    })
                                ];
                            case 3:
                                token = _state.sent();
                                return [
                                    2,
                                    {
                                        user: {
                                            id: user._id.toString(),
                                            username: user.username,
                                            role: user.role
                                        },
                                        token: token
                                    }
                                ];
                            case 4:
                                error = _state.sent();
                                throw error;
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
            key: "registerUser",
            value: function registerUser(param) {
                var role = param.role, email = param.email;
                var _this = this;
                return _async_to_generator(function() {
                    var username, existingUser, stringPassword, newUser, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    3,
                                    ,
                                    4
                                ]);
                                username = email.split("@")[0];
                                return [
                                    4,
                                    _this.ModelUser.findOne({
                                        username: username
                                    })
                                ];
                            case 1:
                                existingUser = _state.sent();
                                if (existingUser) {
                                    throw ErrorHandlerFactory.createError(new Error("Username is already taken"));
                                }
                                stringPassword = generateSecurePassword().stringPassword;
                                return [
                                    4,
                                    _this.ModelUser.create({
                                        username: username,
                                        password: stringPassword,
                                        role: role
                                    })
                                ];
                            case 2:
                                newUser = _state.sent();
                                return [
                                    2,
                                    {
                                        user: {
                                            id: newUser._id,
                                            username: newUser.username,
                                            role: newUser.role,
                                            password: stringPassword
                                        }
                                    }
                                ];
                            case 3:
                                error = _state.sent();
                                console.log(error);
                                throw error;
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
            key: "updateUser",
            value: function updateUser(param) {
                var userId = param.userId, newEmail = param.newEmail;
                var _this = this;
                return _async_to_generator(function() {
                    var existingUser, newUsername, stringPassword, updatedUser, error;
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
                                    _this.ModelUser.findById(userId)
                                ];
                            case 1:
                                existingUser = _state.sent();
                                if (!existingUser) {
                                    throw ErrorHandlerFactory.createError(new Error("User not found"));
                                }
                                // Generate a new username based on the new email
                                newUsername = newEmail.split("@")[0];
                                // Generate a new secure password
                                stringPassword = generateSecurePassword().stringPassword;
                                return [
                                    4,
                                    _this.ModelUser.findByIdAndUpdate(userId, {
                                        email: newEmail,
                                        username: newUsername,
                                        password: stringPassword
                                    }, {
                                        new: true,
                                        runValidators: true
                                    })
                                ];
                            case 2:
                                updatedUser = _state.sent();
                                if (!updatedUser) {
                                    throw ErrorHandlerFactory.createError(new Error("User update failed"));
                                }
                                return [
                                    2,
                                    {
                                        user: {
                                            id: updatedUser._id,
                                            username: updatedUser.username,
                                            role: updatedUser.role,
                                            password: stringPassword
                                        }
                                    }
                                ];
                            case 3:
                                error = _state.sent();
                                console.log(error);
                                throw error;
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
            key: "deactivateUser",
            value: function deactivateUser(param) {
                var userId = param.userId;
                var _this = this;
                return _async_to_generator(function() {
                    var existingUser, deactivatedUser, error;
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
                                    _this.ModelUser.findById(userId)
                                ];
                            case 1:
                                existingUser = _state.sent();
                                if (!existingUser) {
                                    throw ErrorHandlerFactory.createError(new Error("User not found"));
                                }
                                return [
                                    4,
                                    _this.ModelUser.findByIdAndUpdate(userId, {
                                        isActive: false
                                    }, {
                                        new: true
                                    })
                                ];
                            case 2:
                                deactivatedUser = _state.sent();
                                if (!deactivatedUser) {
                                    throw ErrorHandlerFactory.createError(new Error("User deactivation failed"));
                                }
                                return [
                                    2,
                                    {
                                        user: {
                                            id: deactivatedUser._id,
                                            username: deactivatedUser.username,
                                            role: deactivatedUser.role,
                                            isActive: deactivatedUser.isActive
                                        }
                                    }
                                ];
                            case 3:
                                error = _state.sent();
                                console.log(error);
                                throw error;
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
    return UserService;
}();
_define_property(UserService, "ModelUser", ModelUser);
