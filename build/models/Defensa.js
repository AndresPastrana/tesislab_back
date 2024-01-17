import { Schema, model } from "mongoose";
import { CourtRole } from "../const.js";
var DefensaSchema = new Schema({
    doc_url: {
        type: String,
        required: true,
        minlength: 20
    },
    pres_url: {
        type: String,
        required: true,
        minlength: 20
    },
    eval: {
        type: Number,
        min: 2,
        max: 5
    },
    recomns: {
        type: String,
        required: true,
        minlength: 20
    },
    metadata: {
        general_target: {
            type: String,
            required: true
        },
        functional_requirements: {
            type: [
                String
            ],
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        tutors: {
            type: [
                String
            ],
            required: true
        },
        student: {
            type: String,
            required: true
        },
        key_words: {
            type: [
                String
            ],
            required: true
        },
        scientific_problem: {
            type: String,
            required: true
        },
        court: {
            type: [
                {
                    fullname: {
                        type: String,
                        required: true
                    },
                    role: {
                        type: String,
                        enum: Object.values(CourtRole),
                        required: true
                    }
                }
            ],
            required: true
        }
    },
    date: {
        type: Date,
        required: false,
        default: new Date()
    }
});
export var ModelDefense = model("Defense", DefensaSchema);
