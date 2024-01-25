import { Document, Schema, model } from "mongoose";
import { EvalStatus, EvalType } from "../const.js";

export interface EvaluationType {
  type: EvalType;
  status: EvalStatus;
  endDate: Date;
  description: string;
  resourcesFile: string | null;
}

export interface EvaluationDocument extends EvaluationType, Document {}

const EvaluationSchema = new Schema<EvaluationDocument>(
  {
    type: { type: String, enum: Object.values(EvalType), required: true },
    status: {
      type: String,
      enum: Object.values(EvalStatus),
      required: false,
      default: EvalStatus.Open,
    },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    resourcesFile: {
      type: String,
      required: false,
    },
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

export const ModelEvaluation = model<EvaluationDocument>(
  "Evaluation",
  EvaluationSchema
);
