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
import mongoose, { Schema } from "mongoose";
import { RangoAcademico } from "../const.js";
// Mongoose schema
var AcademicRankSchema = new Schema({
    rank: {
        type: String,
        enum: Object.values(RangoAcademico),
        required: true
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
    },
    timestamps: true
});
// Mongoose model
var AcademicRankModel = mongoose.model("AcademicRank", AcademicRankSchema);
export { AcademicRankModel };
