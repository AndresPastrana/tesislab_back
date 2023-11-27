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
import { ErrorFactory } from "../errors/error.js";
import { generateSecurePassword } from "../helpers/hash.js";
import { createJWTAsync } from "../helpers/jwt.js";
import { ModelUser } from "../models/User.js";
var AuthService = /*#__PURE__*/ function() {
    "use strict";
    function AuthService() {
        _class_call_check(this, AuthService);
    }
    _create_class(AuthService, null, [
        {
            key: "login",
            value: function login(param) {
                var username = param.username, password = param.password;
                return _async_to_generator(function() {
                    var user, isValidPassword, access_token, error, err;
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
                                    ModelUser.findOne({
                                        username: username
                                    })
                                ];
                            case 1:
                                user = _state.sent();
                                if (!user) {
                                    throw ErrorFactory.createAuthError("Invalid Credentials");
                                }
                                return [
                                    4,
                                    user.isValidPassword(password)
                                ];
                            case 2:
                                isValidPassword = _state.sent();
                                if (!isValidPassword) {
                                    throw ErrorFactory.createAuthError("Invalid Credentials");
                                }
                                return [
                                    4,
                                    createJWTAsync({
                                        uid: user._id.toString(),
                                        role: user.role
                                    })
                                ];
                            case 3:
                                access_token = _state.sent();
                                return [
                                    2,
                                    access_token
                                ];
                            case 4:
                                error = _state.sent();
                                err = error;
                                throw new Error(err.message);
                            case 5:
                                return [
                                    2
                                ];
                        }
                    });
                // Here you can generate a token or handle the login response as needed.
                // For simplicity, we're not returning anything for a successful login.
                })();
            }
        },
        {
            key: "register",
            value: // Returns the user_id of the created user
            function register(param) {
                var role = param.role, email = param.email;
                return _async_to_generator(function() {
                    var password, username, newUser, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                password = generateSecurePassword();
                                console.log(password);
                                //TODO: Validate duplicate email
                                username = email.split("@")[0];
                                console.log(username);
                                return [
                                    4,
                                    ModelUser.create({
                                        username: username,
                                        password: password,
                                        role: role,
                                        email: email
                                    })
                                ];
                            case 1:
                                newUser = _state.sent();
                                return [
                                    2,
                                    {
                                        _id: newUser._id,
                                        email: newUser.email,
                                        password: newUser.password
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                throw ErrorFactory.createAuthError("Error creating the new user");
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
            key: "remove",
            value: function remove(param) {
                var id = param.id;
                return _async_to_generator(function() {
                    var removed_user, error;
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
                                    ModelUser.findByIdAndUpdate(id, {
                                        isActive: false
                                    })
                                ];
                            case 1:
                                removed_user = _state.sent();
                                return [
                                    2,
                                    removed_user === null || removed_user === void 0 ? void 0 : removed_user._id
                                ];
                            case 2:
                                error = _state.sent();
                                throw ErrorFactory.createAuthError("Error removing the user");
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
            key: "update",
            value: // To update a password or the email of a user
            function update(param) {
                var id = param.id, _param_email = param.email, email = _param_email === void 0 ? null : _param_email;
                return _async_to_generator(function() {
                    var username, updatedUser, username1, email1, _id;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                if (!email) return [
                                    3,
                                    2
                                ];
                                username = email.split("@")[0];
                                return [
                                    4,
                                    ModelUser.findByIdAndUpdate(id, {
                                        email: email,
                                        username: username
                                    })
                                ];
                            case 1:
                                updatedUser = _state.sent();
                                if (updatedUser) {
                                    username1 = updatedUser.username, email1 = updatedUser.email, _id = updatedUser._id;
                                    return [
                                        2,
                                        {
                                            _id: _id,
                                            username: username1,
                                            email: email1
                                        }
                                    ];
                                }
                                _state.label = 2;
                            case 2:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return AuthService;
}();
export { AuthService as default };
