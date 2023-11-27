import { Schema, model } from "mongoose";
import { CourtRole } from "../const.js";
var CourtSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [
        {
            profesor: {
                type: Schema.Types.ObjectId,
                ref: "Profesor",
                required: true
            },
            role: {
                type: String,
                enum: Object.values(CourtRole),
                required: true
            }
        }
    ]
});
export var ModelCourt = model("Court", CourtSchema);
