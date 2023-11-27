import { validationResult } from "express-validator";
import { handleResponse } from "../middleware/index.js";
export var validateRequest = function(req, res, next) {
    var errors = validationResult(req).array();
    return errors.length > 0 ? handleResponse({
        error: errors,
        res: res,
        statusCode: 400
    }) : next();
};
