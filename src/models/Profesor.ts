import { Document, Schema, model } from "mongoose";
import { RangoAcademico } from "../const.js";

interface ProfesorType {
  academic_rank: RangoAcademico;
  person_info: Schema.Types.ObjectId;
}

interface Profesor extends ProfesorType, Document {}

const ProfesorSchema = new Schema<Profesor>(
  {
    academic_rank: {
      type: String,
      enum: Object.values(RangoAcademico),
      required: true,
    },
    person_info: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
  },
  {
    methods: {
      toJSON: function (this) {
        const { __v, _id, id, ...rest } = this.toObject();
        return { id: _id.toString(), ...rest };
      },
    },
  }
);

export const ModelProfesor = model<Profesor>("Profesor", ProfesorSchema);
