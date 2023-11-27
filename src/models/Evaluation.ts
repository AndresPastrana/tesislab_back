import { Document, Schema, model } from "mongoose";
import { EvalStatus, EvalType } from "../const.js";

interface EvaluationType {
  student: Schema.Types.ObjectId;
  type: EvalType;
  status: EvalStatus;
  date: { type: Date };
  file: string;
  description: string;
  score: number; // Assuming it can be null
  recoms: string[];
  ancient: boolean;
}

interface Evaluation extends EvaluationType, Document {}

const EvaluationSchema = new Schema<Evaluation>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    type: { type: String, enum: Object.values(EvalType) },
    status: { type: String, enum: Object.values(EvalStatus) },
    date: { type: Date, required: true },
    file: { type: String, required: true },
    description: { type: String, required: true },
    score: { type: Number, required: false, default: null },
    recoms: { type: [String], required: false, default: [] },
    ancient: { type: Boolean, required: true },
  },
  {
    methods: {
      toJSON: function (this) {
        const { __v, _id, id, ...rest } = this.toObject();
        return { id: _id.toString(), ...rest };
      },
    },
    timestamps: true,
  }
);

export const ModelEvaluation = model("Evaluation", EvaluationSchema);
