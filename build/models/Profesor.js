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
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
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
});
export var ModelProfesor = model("Profesor", ProfesorSchema);
