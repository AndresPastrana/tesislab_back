import { Schema, model } from "mongoose";
import { Sex } from "../const.js";
var PersonSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ci: {
        type: String,
        required: true,
        maxlength: 11,
        minlength: 11,
        trim: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
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
        trim: true,
        minlength: 8,
        maxlength: 8
    },
    sex: {
        type: String,
        enum: Sex,
        required: true
    }
});
export var ModelPerson = model("Person", PersonSchema);
