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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { handleResponse } from "./handleResponse.js";
export var isValidToken = function(req, res, next) {
    var _req_headers = req.headers, _req_headers_authorization = _req_headers.authorization, authorization = _req_headers_authorization === void 0 ? null : _req_headers_authorization;
    if (!authorization || !authorization.includes("Bearer")) {
        return handleResponse({
            res: res,
            statusCode: 401,
            error: true,
            msg: "Authorization header missed or inavlid"
        });
    }
    // Verify token
    var toVerify = authorization.split("Bearer ")[1];
    var key = process.env.SECRET_KEY || "";
    try {
        var token = jwt.verify(toVerify, key, {
            complete: true
        });
        if (token.payload) {
            var payload = token.payload;
            // The uid is appended to the req.user as an ObjectId
            var user = _object_spread_props(_object_spread({}, payload), {
                uid: new Types.ObjectId(payload.uid)
            });
            req.user = user;
            return next();
        }
        return handleResponse({
            res: res,
            msg: "Invalid jwt",
            error: "Invalid jwt",
            statusCode: 401
        });
    } catch (error) {
        return handleResponse({
            res: res,
            error: error,
            msg: "Invalid jwt",
            statusCode: 401
        });
    }
};
