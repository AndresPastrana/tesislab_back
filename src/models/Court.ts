import { Document, Schema, model } from "mongoose";
import { CourtRole } from "../const.js";

type CourtMember = {
  profesor: string | Schema.Types.ObjectId;
  role: CourtRole;
};

export interface CourtType {
  name: string; // Nombre del tribunal
  members: CourtMember[]; // Lista de profesores que forman parte del tribunal y su role
}
interface Court extends CourtType, Document {}

const CourtSchema = new Schema<CourtType>({
  name: { type: String, required: true },
  members: [
    {
      profesor: {
        type: Schema.Types.ObjectId,
        ref: "Profesor",
        required: true,
      },
      role: { type: String, enum: Object.values(CourtRole), required: true },
    },
  ],
});

export const ModelCourt = model("Court", CourtSchema);
