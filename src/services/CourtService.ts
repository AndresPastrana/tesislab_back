import { Court, ModelCourt } from "./../models/Court.js";
import { CourtRole } from "../const.js";
import { CourtType } from "../models/Court.js";

type PopulatedCourtMember = {
  profesor: {
    _id: string;
    name: string;
    lastname: string;
  };
  role: CourtRole;
};

type PopulatedCourt = Omit<CourtType, "members"> & {
  members: PopulatedCourtMember[];
};

export class CourtsService {
  private static CourtModel = ModelCourt;

  private static async isRoleUniqueWithinCourt(
    courtId: string,
    role: CourtRole
  ): Promise<boolean> {
    const existingCourt = await this.CourtModel.findOne({
      _id: courtId,
      "members.role": role,
    });

    return !existingCourt;
  }

  static async createCourt(courtData: Court): Promise<CourtType> {
    try {
      const createdCourt = await this.CourtModel.create(courtData);
      return createdCourt.toObject();
    } catch (error: any) {
      throw new Error(`Error in the Court Service: ${error.message}`);
    }
  }

  static async editCourt(
    courtId: string,
    courtData: Court
  ): Promise<CourtType | null> {
    try {
      const isUnique = await this.isRoleUniqueWithinCourt(
        courtId,
        courtData.members[0].role
      );
      if (!isUnique) {
        throw new Error(
          "Error in the Court Service: Role must be unique within the court"
        );
      }

      const updatedCourt = await this.CourtModel.findByIdAndUpdate(
        courtId,
        courtData,
        { new: true }
      );
      return updatedCourt ? updatedCourt.toObject() : null;
    } catch (error: any) {
      throw new Error(`Error in the Court Service: ${error.message}`);
    }
  }

  static async getCourtInfoById(
    courtId: string
  ): Promise<PopulatedCourt | null> {
    try {
      const court = await this.CourtModel.findById(courtId)
        .populate({
          path: "members.profesor",
          model: "Profesor",
          select: "name lastname",
        })
        .exec();

      return court ? court.toObject() : null;
    } catch (error: any) {
      throw new Error(`Error in the Court Service: ${error.message}`);
    }
  }

  static async removeCourt(courtId: string): Promise<void> {
    try {
      await this.CourtModel.findByIdAndDelete(courtId);
    } catch (error: any) {
      throw new Error(`Error in the Court Service: ${error.message}`);
    }
  }
}
