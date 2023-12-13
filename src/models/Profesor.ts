import { Schema, Document, model } from "mongoose";
import { RangoAcademico, Sex } from "../const.js";

export interface ProfesorType {
  user_id: Schema.Types.ObjectId;
  ci: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  sex: string;
  age: number;
  academic_rank: RangoAcademico;
  ancient: boolean;
}

interface ProfesorDocument extends ProfesorType, Document {}

const ProfesorSchema = new Schema<ProfesorDocument>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ci: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 1,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 1,
      maxlength: 50,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 1,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 8,
      trim: true,
    },
    sex: {
      type: String,
      required: true,
      enum: Sex,
    },
    age: {
      type: Number,
      required: true,
      min: 16,
      max: 60,
    },

    academic_rank: { type: String, required: true, enum: RangoAcademico },
    ancient: {
      type: Boolean,
      required: false,
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
  }
);

export const ModelProfesor = model<ProfesorDocument>(
  "Profesor",
  ProfesorSchema
);
