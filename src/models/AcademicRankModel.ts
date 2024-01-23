import mongoose, { Schema, Document } from "mongoose";
import { RangoAcademico } from "../const.js";

interface AcademicRank {
  rank: RangoAcademico;
}

// Mongoose document interface
interface AcademicRankDocument extends AcademicRank, Document {}

// Mongoose schema
const AcademicRankSchema = new Schema<AcademicRankDocument>(
  {
    rank: {
      type: String,
      enum: Object.values(RangoAcademico),
      required: true,
    },
  },
  {
    methods: {
      toJSON: function (this) {
        const { __v, _id, id, ...rest } = this.toObject();
        return { id: _id.toString(), ...rest };
      },
    },
    timestamps: true,
  }
);

// Mongoose model
const AcademicRankModel = mongoose.model<AcademicRankDocument>(
  "AcademicRank",
  AcademicRankSchema
);

export { AcademicRankModel, AcademicRankDocument, AcademicRank };
