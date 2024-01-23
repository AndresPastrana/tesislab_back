import { RangoAcademico } from "../const.js";
import {
  AcademicRank,
  AcademicRankDocument,
  AcademicRankModel,
} from "../models/AcademicRankModel.js";

class AcademicRankService {
  // ...

  // Validate uniqueness before saving or updating
  private static async validateUniqueness(
    rank: RangoAcademico,
    currentRankId?: string
  ): Promise<void> {
    const existingRank = await AcademicRankModel.findOne({ rank });
    if (existingRank && existingRank._id.toString() !== currentRankId) {
      throw new Error(`Academic rank '${rank}' already exists.`);
    }
  }

  // Get all academic ranks
  static async getAllAcademicRanks(): Promise<AcademicRankDocument[]> {
    try {
      const ranks = await AcademicRankModel.find();
      return ranks;
    } catch (error) {
      throw new Error(`Error getting academic ranks: ${error}`);
    }
  }

  // Get academic rank by ID
  static async getAcademicRankById(
    id: string
  ): Promise<AcademicRankDocument | null> {
    try {
      const rank = await AcademicRankModel.findById(id);
      return rank;
    } catch (error) {
      throw new Error(`Error getting academic rank by ID: ${error}`);
    }
  }

  // Create a new academic rank
  static async createAcademicRank(
    rank: RangoAcademico
  ): Promise<AcademicRankDocument> {
    try {
      await AcademicRankService.validateUniqueness(rank);
      const newRank: AcademicRankDocument = new AcademicRankModel({ rank });
      const savedRank = await newRank.save();
      return savedRank;
    } catch (error) {
      throw new Error(`Error creating academic rank: ${error}`);
    }
  }

  // Update academic rank by ID
  static async updateAcademicRank(
    id: string,
    updatedRank: AcademicRank
  ): Promise<AcademicRankDocument | null> {
    try {
      const currentRank = await AcademicRankModel.findById(id);
      if (!currentRank) {
        throw new Error(`Academic rank with ID '${id}' not found.`);
      }

      await AcademicRankService.validateUniqueness(updatedRank.rank, id);

      const rank = await AcademicRankModel.findByIdAndUpdate(id, updatedRank, {
        new: true,
      });
      return rank;
    } catch (error) {
      throw new Error(`Error updating academic rank: ${error}`);
    }
  }

  // Delete academic rank by ID
  static async deleteAcademicRank(id: string): Promise<void> {
    try {
      await AcademicRankModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting academic rank: ${error}`);
    }
  }
}

export default AcademicRankService;
