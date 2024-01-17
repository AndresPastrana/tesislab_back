import { Schema, Document, Types } from "mongoose";
import { TesisProjectStatus, UserRole } from "../const.js";
import { ModelTesisProject } from "../models/TesisProject.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { ModelProfesor } from "../models/Profesor.js";

export interface TesisProjectInput {
  topic?: string;
  general_target?: string;
  scientific_problem?: string;
  tutors?: Array<Schema.Types.ObjectId>;
  student?: Schema.Types.ObjectId;
  ancient?: boolean;
  status?: TesisProjectStatus;
}

type BasicPersonInfo = { id: string; name: string; lastname: string };

type Tutors = [BasicPersonInfo];
type Student = BasicPersonInfo;

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

export type PopulatedTesisResponse = Omit<
  TesisProjectResponse,
  "tutors" | "student"
> & {
  student: Student;
  tutors: Tutors;
};

export class TesisProjectService {
  private static ModelTesisProject = ModelTesisProject;

  static async createTesisProject(
    data: TesisProjectInput
  ): Promise<TesisProjectResponse> {
    try {
      const newTesisProject = await this.ModelTesisProject.create(data);
      // if (!newTesisProject) {
      //   throw new Error("Error creating a new tesis project");
      // }
      return this.formatTesisProjectResponse(newTesisProject);
    } catch (error: any) {
      throw ErrorHandlerFactory.createError(error);
    }
  }

  static async editTesisProject(
    projectId: string | Types.ObjectId,
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
      console.log(error);

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
    projectId: Types.ObjectId,
    active: string
  ): Promise<PopulatedTesisResponse> {
    try {
      const status_filter = this.buildStatusFilter(active);

      const tesisProject = await this.ModelTesisProject.findOne({
        ...status_filter,
        _id: projectId,
      })
        .populate("student", "name lastname") // Adjust fields as needed
        .populate("tutors", "name lastname"); // Adjust fields as needed

      if (!tesisProject) {
        throw new Error("Tesis project not found");
      }

      return this.formatPopulatedTesisResponse(tesisProject);
    } catch (error) {
      throw error;
    }
  }

  static async getAllProjects(active: string): Promise<any> {
    try {
      const filter = this.buildStatusFilter(active);

      const tesisProjects = await this.ModelTesisProject.find({
        ...filter,
      })
        .populate("student", "name lastname")
        .populate("tutors", "name lastname");

      // Map and format the response
      return tesisProjects.map((project) =>
        this.formatPopulatedTesisResponse(project)
      );
    } catch (error) {
      throw error;
    }
  }

  static async getProjectsByMemberId(
    active: string,
    memberId: Schema.Types.ObjectId,
    typeOfMember: UserRole.Student | UserRole.Profesor
  ): Promise<PopulatedTesisResponse | PopulatedTesisResponse[]> {
    try {
      const status_filter = this.buildStatusFilter(active);

      let filter: any = { ...status_filter };

      switch (typeOfMember) {
        case UserRole.Student:
          filter.student = memberId;
          const studentProject = await this.ModelTesisProject.findOne(filter)
            .populate("student", "name lastname")
            .populate("tutors", "name lastname");

          if (!studentProject) {
            throw new Error("No tesis project found for the given student ID");
          }

          // Format and return a single project
          return this.formatPopulatedTesisResponse(studentProject);

        case UserRole.Profesor:
          filter.tutors = memberId;
          const professorProjects = await this.ModelTesisProject.find(filter)
            .populate("student", "name lastname")
            .populate("tutors", "name lastname");

          if (!professorProjects || professorProjects.length === 0) {
            return [];
          }

          // Map and format the response for multiple projects
          return professorProjects.map((project) =>
            this.formatPopulatedTesisResponse(project)
          );

        default:
          throw new Error("Invalid member type");
      }
    } catch (error) {
      throw error;
    }
  }

  static async approveTesisProject(
    projectId: string,
    recoms: string,
    uid: string
  ): Promise<TesisProjectResponse> {
    try {
      const approvedTesisProject =
        await this.ModelTesisProject.findByIdAndUpdate(
          projectId,
          {
            status: TesisProjectStatus.Approved,
            approval: {
              isApprove: true,
              recommendations: recoms,
              approvedBy: uid,
            },
          },
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
  ): Promise<PopulatedTesisResponse> {
    try {
      const updatedTesisProject =
        await this.ModelTesisProject.findByIdAndUpdate(
          projectId,
          { functional_requirements: functionalRequirements },
          { new: true }
        )
          .populate("student", "name lastname")
          .populate("tutors", "name lastname");

      if (!updatedTesisProject) {
        throw new Error("Error updating tesis project");
      }

      return this.formatPopulatedTesisResponse(updatedTesisProject);
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

  private static buildStatusFilter(active: string) {
    let filter: any = {};

    switch (active) {
      case "true":
        filter = {
          $and: [
            {
              status: {
                $in: [TesisProjectStatus.Pending, TesisProjectStatus.Approved],
              },
              ancient: false,
            },
          ],
        };
        break;

      case "false":
        filter = { ancient: true };
        break;

      default:
        // Handle other cases if needed
        break;
    }

    return filter;
  }

  // Helper method to format the response
  private static formatPopulatedTesisResponse(
    tesisProject: Document
  ): PopulatedTesisResponse {
    const { __v, _id, id, student, tutors, ...rest } = tesisProject.toObject();

    // Format the "id" field for the student
    const formattedStudent: Student = {
      id: student?._id?.toString() || null,
      name: student?.name || null,
      lastname: student?.lastname || null,
    };

    // Format the "id" field for each tutor
    const formattedTutors: Tutors =
      tutors?.map(
        (tutor: BasicPersonInfo & { _id: Schema.Types.ObjectId }) => ({
          id: tutor?._id?.toString() || null,
          name: tutor?.name || null,
          lastname: tutor?.lastname || null,
        })
      ) || [];

    // Build the formatted response
    const formattedResponse: PopulatedTesisResponse = {
      id: _id.toString(),
      student: formattedStudent,
      tutors: formattedTutors,
      ...rest,
    };

    return formattedResponse;
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
