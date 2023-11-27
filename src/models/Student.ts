import { Document, Schema, model } from "mongoose";

export interface StudentType {
  person_info: Schema.Types.ObjectId;
  language_certificate: boolean;
}

interface Student extends StudentType, Document {}

const StudentSchema = new Schema<Student>(
  {
    person_info: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    language_certificate: {
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

export const ModelStudent = model("Student", StudentSchema);
