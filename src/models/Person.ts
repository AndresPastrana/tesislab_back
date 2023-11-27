import { Document, Schema, model } from "mongoose";
import { Sex } from "../const.js";

interface PersonType {
  user_id: Schema.Types.ObjectId;
  ci: string; // String, Not Null
  name: string; // String, Not Null
  lastname: string; // String, Not Null
  address: string; // String, Not Null
  email: string; // String, Not Null
  phone: string; // String, Not Null
  sex: string; // String, Not Null
  age: number; // Number, Not Null
  ancient: boolean;
}
interface Person extends PersonType, Document {}

const PersonSchema = new Schema<Person>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ci: { type: String, maxlength: 11, required: true },
  name: { type: String, required: true, lowercase: true },
  lastname: { type: String, required: true, lowercase: true },
  address: { type: String, required: true, lowercase: true },
  age: { type: Number, min: 18, max: 60, required: true },
  phone: { type: String, required: true, trim: true },
  sex: { type: String, enum: Object.values(Sex), required: true },
});

export const ModelPerson = model<Person>("Person", PersonSchema);
