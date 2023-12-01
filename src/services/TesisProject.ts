import { Schema, Document } from "mongoose";
import { TesisProjectStatus, UserRole } from "../const.js";
import { ModelTesisProject } from "../models/TesisProject.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { ModelProfesor } from "../models/Profesor.js";

export interface TesisProjectInput {
  topic: string;
  general_target: string;
  scientific_problem: string;
  tutors?: Array<Schema.Types.ObjectId>;
  student?: Schema.Types.ObjectId;
}

interface TesisProjectResponse {
  id: string;
  tutors: Array<Schema.Types.ObjectId>;
  student: Schema.Types.ObjectId;
  topic: string;
  general_target: string;
  scientific_problem: string;
  functional_requirements: string[];
  status: TesisProjectStatus;
  approval: {
    isApprove: boolean;
    recommendations: string[];
    approvedBy: Schema.Types.ObjectId | null;
    date: Date | null;
  };
  ancient: boolean;
}

export class TesisProjectService {
  private static ModelTesisProject = ModelTesisProject;

  static async createTesisProject(
    data: TesisProjectInput
  ): Promise<TesisProjectResponse> {
    try {
      const newTesisProject = await this.ModelTesisProject.create(data);
      if (!newTesisProject) {
        throw new Error("Error creating a new tesis project");
      }
      return this.formatTesisProjectResponse(newTesisProject);
    } catch (error: any) {
      throw ErrorHandlerFactory.createError(error);
    }
  }

  static async editTesisProject(
    projectId: string,
    data: TesisProjectInput
  ): Promise<TesisProjectResponse> {
    try {
      const updatedTesisProject =
        await this.ModelTesisProject.findByIdAndUpdate(projectId, data, {
          new: true,
          runValidators: true,
        });
      if (!updatedTesisProject) {
        throw new Error("Error creating a new tesis project");
      }

      return this.formatTesisProjectResponse(updatedTesisProject);
    } catch (error) {
      throw ErrorHandlerFactory.createError(error as any);
    }
  }

  static async closeTesisProject(projectId: string): Promise<boolean> {
    try {
      // Assuming "Closed" is a status value for a closed project
      const obj = await this.ModelTesisProject.findByIdAndUpdate(projectId, {
        status: TesisProjectStatus.Closed,
      });
      return obj ? true : false;
    } catch (error) {
      throw ErrorHandlerFactory.createError(error as any);
    }
  }

  static async getTesisProjectInfo(
    projectId: string
  ): Promise<TesisProjectResponse> {
    try {
      const tesisProject = await this.ModelTesisProject.findById(projectId);
      if (!tesisProject) {
        throw new Error("Error getting the info of the tesis project");
      }
      return this.formatTesisProjectResponse(tesisProject);
    } catch (error) {
      throw ErrorHandlerFactory.createError(error as any);
    }
  }

  static async approveTesisProject(
    projectId: string
  ): Promise<TesisProjectResponse> {
    try {
      const approvedTesisProject =
        await this.ModelTesisProject.findByIdAndUpdate(
          projectId,
          { "approval.isApprove": true },
          { new: true }
        );
      if (!approvedTesisProject) {
        throw new Error("Error approving tesis project");
      }

      return this.formatTesisProjectResponse(approvedTesisProject);
    } catch (error) {
      throw ErrorHandlerFactory.createError(error as any);
    }
  }

  static async updateFunctionalRequirements(
    projectId: string,
    functionalRequirements: string[]
  ): Promise<TesisProjectResponse> {
    try {
      const updatedTesisProject =
        await this.ModelTesisProject.findByIdAndUpdate(
          projectId,
          { functional_requirements: functionalRequirements },
          { new: true }
        );

      if (!updatedTesisProject) {
        throw new Error("Error updating tesis project");
      }

      return this.formatTesisProjectResponse(updatedTesisProject);
    } catch (error) {
      throw ErrorHandlerFactory.createError(error as any);
    }
  }

  private static formatTesisProjectResponse(
    tesisProject: Document
  ): TesisProjectResponse {
    const { __v, _id, id, ...rest } = tesisProject.toObject();
    return { id: _id.toString(), ...rest };
  }
  static async removeMemberFromTesisProject({
    typeOfMember,
    memberId,
  }: {
    typeOfMember: UserRole.Profesor | UserRole.Student;
    memberId: Schema.Types.ObjectId;
  }) {
    try {
      if (typeOfMember === UserRole.Student) {
        const tesisProject = await ModelTesisProject.findOneAndUpdate(
          { student: memberId },
          { student: null }
        );
        // Handle tesisProject if needed
      }

      if (typeOfMember === UserRole.Profesor) {
        const updatedDocs = await ModelTesisProject.updateMany(
          { tutors: memberId },
          { $pull: { tutors: memberId } }
        );
      }
    } catch (error) {
      const err = error as Error;
      throw new Error(`Error in TesisProjectServices: ${err.message}`);
    }
  }

  static async getApprovalInfo(studentId: Schema.Types.ObjectId) {
    try {
      const tesisProject = await ModelTesisProject.findOne(
        { student: studentId },
        {
          "approval.date": 1,
          "approval.approvedBy": 1,
          "approval.recommendations": 1,
        }
      ).populate({
        path: "approval.approvedBy",
        model: ModelProfesor,
        select: "name lastame", // Fields to select from the referenced collection
      });

      // If tesisProject is not found, you can handle it as needed
      if (!tesisProject) {
        return null; // or throw an error, or return a default value
      }

      const approvalInfo = {
        date: tesisProject.approval?.date || null,
        approvedBy: {
          name: tesisProject.approval?.approvedBy?.name || null,
          lastName: tesisProject.approval?.approvedBy?.lastname || null,
        },
        recommendations: tesisProject.approval?.recommendations || [],
      };

      return approvalInfo;
    } catch (error) {
      console.error("Error fetching approval info:", error);
      throw error; // You might want to handle this error more gracefully
    }
  }
}
