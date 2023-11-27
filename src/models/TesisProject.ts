import { Document, Schema, model } from "mongoose";
import { TesisProjectStatus } from "../const.js";

interface TesisProjectType {
  tutors: Array<Schema.Types.ObjectId>;
  student: Schema.Types.ObjectId;
  topic: string; //required
  general_target: string; //required
  scientific_problem: string; //required
  functional_requirements: string[];
  status: TesisProjectStatus; //not required
  approval: {
    isApprove: boolean;
    recommendations: String[];
    approvedBy: Schema.Types.ObjectId | null;
    date: Date | null;
  };

  ancient: boolean; //not required
}
interface TesisProject extends TesisProjectType, Document {}

const TesisProjectSchema = new Schema<TesisProject>(
  {
    tutors: {
      type: [{ type: Schema.Types.ObjectId, ref: "Profesor" }],
      required: false,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: false,
    },
    topic: {
      type: String,
      required: true,
      maxlength: 20,
    },
    general_target: {
      type: String,
      required: true,
      maxlength: 30,
    },
    scientific_problem: {
      type: String,
      required: true,
      maxlength: 300,
    },
    functional_requirements: {
      type: [{ type: String }],
      required: false,
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(TesisProjectStatus),
      required: false,
      default: TesisProjectStatus.Pending,
    },
    approval: {
      type: {
        isApprove: { type: Boolean, required: false, default: false },
        recommendations: { type: [String], required: false, default: [] },
        approvedBy: {
          type: Schema.Types.ObjectId,
          ref: "Profesor",
          required: false,
        },
        date: { type: Date },
      },
    },
    ancient: {
      type: Boolean,
      required: false,
      default: false,
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

export const ModelTesisProject = model("TesisProject", TesisProjectSchema);
