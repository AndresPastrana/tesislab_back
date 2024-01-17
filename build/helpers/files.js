import { randomUUID } from "crypto";
export var getFileExtension = function(file) {
    if (!file) {
        throw new Error("Invalid function params");
    }
    var fileExtension = (file.originalname || "").split(".").pop();
    console.log(fileExtension);
    return fileExtension;
};
export var getUniqueFileName = function(file) {
    if (!file) {
        throw new Error("Invalid function params");
    }
    // Generate a unique filename using randomUUID and the original file extension
    var fileExtension = getFileExtension(file);
    if (!fileExtension) {
        throw new Error("Invalid file extension");
    }
    var uniqueFileName = "".concat(randomUUID(), ".").concat(fileExtension);
    return uniqueFileName;
};
export var isValidFile = function(extensions, file) {
    if (!file) {
        throw new Error("Invalid function params");
    }
    var fileExtension = getFileExtension(file);
    if (!fileExtension) {
        throw new Error("Invalid file extension");
    }
    return extensions.includes(fileExtension.toLowerCase());
};
