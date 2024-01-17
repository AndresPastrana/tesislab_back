import { Document, Schema, Types, model } from "mongoose";

export interface SubmissionType {
  evaluation_id: Schema.Types.ObjectId; // Reference to the evaluation it belongs to
  student_id: Types.ObjectId;
  file: string;
  score: number;
  recoms: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubmissionDocument extends SubmissionType, Document {}

const SubmissionSchema = new Schema<SubmissionDocument>(
  {
    evaluation_id: {
      type: Schema.Types.ObjectId,
      ref: "Evaluation",
      required: true,
    },
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    file: { type: String, required: true },
    score: { type: Number, required: false, min: 0, max: 5, default: null },
    recoms: { type: String, required: false, minlength: 10, default: null },
  },
  {
    methods: {
      toJSON: function () {
        const { __v, _id, id, ...rest } = this.toObject();
        return { id: _id.toString(), ...rest };
      },
    },
    timestamps: true,
  }
);

export const ModelSubmission = model<SubmissionDocument>(
  "Submission",
  SubmissionSchema
);
