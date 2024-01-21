import { Schema, Document, model } from "mongoose";
import { Sex } from "../const.js";

export interface StudentType {
  user_id: Schema.Types.ObjectId;
  ci: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  sex: string;
  age: number;
  ancient: boolean;
  language_certificate: boolean;
}

interface StudentDocument extends StudentType, Document {}

const studentSchema = new Schema<StudentDocument>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ci: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: Sex,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    ancient: {
      type: Boolean,
      required: false,
      default: false,
    },
    language_certificate: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      transform: function (_doc: any, ret: any) {
        const { __v, _id, ...rest } = ret;
        return { id: _id.toString(), ...rest };
      },
    },
    timestamps: true,
  }
);

export const ModelStudent = model<StudentDocument>("Student", studentSchema);
