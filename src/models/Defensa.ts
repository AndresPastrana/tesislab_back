import { Document, Schema, model } from "mongoose";
import { CourtRole } from "../const.js";
export interface Defense {
  doc_url: string;
  pres_url: string;

  // Fields for search
  metadata: {
    general_target: string;
    functional_requirements: string[];
    scientific_problem: string;
    topic: string;
    tutors: string[];
    student: string;
    court: { fullname: string; role: CourtRole }[];
    key_words: string[]; // Added field
  };
  eval: number;
  recomns: string;
  date: Date;
}

export type DefenseData = {
  keyWords: string[];
  recoms: string;
  evaluation: number; // Assuming 'evaluation' is a number
  court: string;
  project: string;
  date: Date;
};

export interface DefenseType extends Defense, Document {}

const DefensaSchema = new Schema<DefenseType>({
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
  metadata: {
    general_target: {
      type: String,
      required: true,
    },
    functional_requirements: {
      type: [String],
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    tutors: {
      type: [String],
      required: true,
    },
    student: {
      type: String,
      required: true,
    },
    key_words: {
      type: [String],
      required: true, // Added field
    },
    scientific_problem: {
      type: String,
      required: true,
    },
    court: {
      type: [
        {
          fullname: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            enum: Object.values(CourtRole),
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  date: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export const ModelDefense = model<DefenseType>("Defense", DefensaSchema);
