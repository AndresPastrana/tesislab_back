import { Schema, model } from "mongoose";
var DefensaSchema = new Schema({
    court: {
        type: [
            String
        ],
        required: true,
        minlength: 20
    },
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
    }
});
export var ModelDefense = model("Defense", DefensaSchema);
