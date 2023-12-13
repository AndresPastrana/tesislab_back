import { Document, Schema, model } from "mongoose";

export interface SubmissionType {
  evaluation_id: Schema.Types.ObjectId; // Reference to the evaluation it belongs to
  student_id: Schema.Types.ObjectId; // Reference to the student (foreign key)
  file: string;
  score: number;
  recoms: string;
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
    score: { type: Number, required: false, min: 0, max: 5 },
    recoms: { type: String, required: false, minlength: 10 },
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
