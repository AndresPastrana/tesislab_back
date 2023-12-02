import { Document, Schema, model } from "mongoose";

interface Defense {
  court: string[];
  doc_url: string;
  pres_url: string;
  eval: number;
  recomns: string;
}

export interface DefenseType extends Defense, Document {}

const DefensaSchema = new Schema<DefenseType>({
  court: {
    type: [String],
    required: true,
    minlength: 20,
  },
  doc_url: {
    type: String,
    required: true,
    minlength: 20,
  },
  pres_url: {
    type: String,
    required: true,
    minlength: 20,
  },
  eval: {
    type: Number,
    min: 2,
    max: 5,
  },
  recomns: {
    type: String,
    required: true,
    minlength: 20,
  },
});

export const ModelDefense = model<DefenseType>("Defense", DefensaSchema);
