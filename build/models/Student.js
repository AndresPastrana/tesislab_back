import { Schema, model } from "mongoose";
import { Sex } from "../const.js";
var studentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ci: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: Sex,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    ancient: {
        type: Boolean,
        required: false,
        default: false
    },
    language_certificate: {
        type: Boolean,
        required: true,
        default: false
    }
});
export var ModelStudent = model("Student", studentSchema);
