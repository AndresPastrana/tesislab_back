import { Schema, model } from "mongoose";
import { Sex } from "../const.js";
var PersonSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ci: {
        type: String,
        maxlength: 11,
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 18,
        max: 60,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    sex: {
        type: String,
        enum: Object.values(Sex),
        required: true
    }
});
export var ModelPerson = model("Person", PersonSchema);
