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
    recommendations: String;
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
      default: null,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: false,
      default: null,
    },
    topic: {
      type: String,
      required: true,
      maxlength: 200,
      minlength: 10,
      trim: true,
      lowercase: true,
    },
    general_target: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200,
      trim: true,
      lowercase: true,
    },
    scientific_problem: {
      type: String,
      required: true,
      min: 20,
      maxlength: 500,
      trim: true,
      lowercase: true,
    },
    functional_requirements: {
      type: [{ type: String }],
      required: false,
      default: [],
      trim: true,
      lowercase: true,
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
        recommendations: { type: String, required: false },
        approvedBy: {
          type: Schema.Types.ObjectId,
          ref: "Profesor",
          required: false,
        },
        date: { type: Date, required: false },
      },
      required: false,
      default: null,
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
