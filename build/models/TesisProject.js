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
import { TesisProjectStatus } from "../const.js";
var TesisProjectSchema = new Schema({
    tutors: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Profesor"
            }
        ],
        required: false,
        default: null
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: false,
        default: null
    },
    topic: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 10,
        trim: true,
        lowercase: true
    },
    general_target: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200,
        trim: true,
        lowercase: true
    },
    scientific_problem: {
        type: String,
        required: true,
        min: 20,
        maxlength: 500,
        trim: true,
        lowercase: true
    },
    functional_requirements: {
        type: [
            {
                type: String
            }
        ],
        required: false,
        default: [],
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: Object.values(TesisProjectStatus),
        required: false,
        default: TesisProjectStatus.Pending
    },
    approval: {
        type: {
            isApprove: {
                type: Boolean,
                required: false,
                default: false
            },
            recommendations: {
                type: String,
                required: false
            },
            approvedBy: {
                type: Schema.Types.ObjectId,
                ref: "Profesor",
                required: false
            },
            date: {
                type: Date,
                required: false
            }
        },
        required: false,
        default: null
    },
    ancient: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    methods: {
        toJSON: function toJSON() {
            var _this_toObject = this.toObject(), __v = _this_toObject.__v, _id = _this_toObject._id, id = _this_toObject.id, rest = _object_without_properties(_this_toObject, [
                "__v",
                "_id",
                "id"
            ]);
            return _object_spread({
                id: _id.toString()
            }, rest);
        }
    }
});
export var ModelTesisProject = model("TesisProject", TesisProjectSchema);
