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
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
import { Schema, model } from "mongoose";
import { RangoAcademico, Sex } from "../const.js";
var ProfesorSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    ci: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 11,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 8,
        trim: true
    },
    sex: {
        type: String,
        required: true,
        enum: Sex
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 60
    },
    academic_rank: {
        type: String,
        required: true,
        enum: RangoAcademico
    },
    ancient: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    toJSON: {
        transform: function transform(_doc, ret) {
            var __v = ret.__v, _id = ret._id, rest = _object_without_properties(ret, [
                "__v",
                "_id"
            ]);
            return _object_spread({
                id: _id.toString()
            }, rest);
        }
    }
});
export var ModelProfesor = model("Profesor", ProfesorSchema);
