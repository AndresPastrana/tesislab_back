function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
import { BucketsS3 } from "../const.js";
import fs from "node:fs";
export var validateEditSubmissionFields = function(data) {
    var errors = [];
    // Validate 'recoms'
    if (data.recoms !== undefined) {
        if (typeof data.recoms !== "string" || data.recoms.length < 10) {
            errors.push("Recoms must be a string with a minimum length of 10 characters");
        }
    }
    // Validate 'score'
    if (data.score !== undefined) {
        if (isNaN(data.score) || typeof data.score !== "number" || data.score < 0 || data.score > 5) {
            errors.push("Score must be a numeric value between 0 and 5");
        }
    }
    return errors;
};
export function parseFileUrl(fileUrl) {
    var urlParts = fileUrl.split("/api/files/");
    if (urlParts.length !== 2) {
        throw new Error("Invalid file URL format");
    }
    var _urlParts__split = _sliced_to_array(urlParts[1].split("/"), 2), bucketName = _urlParts__split[0], objectName = _urlParts__split[1];
    if (Object.values(BucketsS3).includes(bucketName)) {
        return {
            bucketName: bucketName,
            objectName: objectName
        };
    }
    // Invalid bucket name
    throw new Error("Invalid bucket name in the file URL");
}
export function readAppTypeKeywords(appType) {
    try {
        // const filePath = path.join("../data/");
        var fileBuffer = fs.readFileSync("./src/data/keywords.json", {
            encoding: "utf8"
        });
        var appTypeKeywords = JSON.parse(fileBuffer.toString());
        return appTypeKeywords[appType] || null;
    } catch (error) {
        var err = error;
        console.error("Error reading appTypeKeywords.json:", err.message);
        return null;
    }
}
