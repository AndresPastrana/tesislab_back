import multer from "multer";
import { isValidFile } from "../helpers/files.js";
import { EvalAllowedExtensions } from "../const.js";
// Set up multer storage for file uploads
var storage = multer.memoryStorage(); // Store files in memory
// Limits
var limits = {
    fileSize: 50 * 1024 * 1024
};
// Define a reusable file filter function
var fileFilter = function(req, file, callback) {
    console.log("Inside multer");
    console.log(file);
    if (isValidFile(EvalAllowedExtensions, file)) {
        callback(null, true);
    } else {
        // Reject the file with a 404 error
        var error = new Error("Invalid file type");
        callback(error);
    }
};
// Multer configuration options
var multerConfig = {
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
};
export var multerMiddleware = multer(multerConfig);
