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
var ValidationError = function ValidationError(validationErrors) {
    "use strict";
    _class_call_check(this, ValidationError);
    _define_property(this, "name", void 0);
    _define_property(this, "message", void 0);
    this.name = "ValidationError";
    this.message = JSON.stringify(validationErrors);
};
var MongoDBError = function MongoDBError(errorMessage) {
    "use strict";
    _class_call_check(this, MongoDBError);
    _define_property(this, "name", void 0);
    _define_property(this, "message", void 0);
    this.name = "MongoDBError";
    this.message = errorMessage;
};
export var ErrorHandlerFactory = /*#__PURE__*/ function() {
    "use strict";
    function ErrorHandlerFactory() {
        _class_call_check(this, ErrorHandlerFactory);
    }
    _create_class(ErrorHandlerFactory, null, [
        {
            key: "createError",
            value: function createError(error) {
                if (error.name === "ValidationError") {
                    return new ValidationError(error.errors);
                } else {
                    return new MongoDBError(error.message);
                }
            }
        }
    ]);
    return ErrorHandlerFactory;
}();
