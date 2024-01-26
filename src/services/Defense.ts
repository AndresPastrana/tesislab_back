import { ObjectId, Types } from "mongoose";

import {
  Defense,
  DefenseData,
  DefenseType,
  ModelDefense,
} from "../models/Defensa.js";
import { TesisProjectService, PopulatedTesisResponse } from "./TesisProject.js";
import { CourtsService } from "./CourtService.js";
import { AppTypes, TesisProjectStatus } from "../const.js";
import { StudentService } from "./StudentsService.js";
import { UserService } from "./User.js";
import { readAppTypeKeywords } from "../helpers/others.js";

export class DefenseService {
  /**
   * Creates a new defense record based on the provided data.
   *
   * @param {Object} defenseData - Data for creating the defense record.
   * @param {Schema.Types.ObjectId} defenseData.studentId - ID of the student.
   * @param {string[]} defenseData.key_words - Keywords associated with the defense.
   * @param {string} defenseData.recoms - Recommendations from the defense.
   * @param {number} defenseData.evaluation - Evaluation score for the defense.
   * @param {string} defenseData.doc_url - URL of the document related to the defense.
   * @param {string} defenseData.pres_url - URL of the presentation related to the defense.
   * @param {string[]} defenseData.court - Names of the court members.
   * @throws {Error} Throws an error if there's an issue creating the defense.
   */
  static async createDefense(
    defenseData: DefenseData & { doc_url: string; pres_url: string } & {
      app_type: AppTypes;
    }
  ): Promise<void | null> {
    try {
      const {
        court,
        keyWords,
        recoms,
        evaluation,
        doc_url,
        pres_url,
        project,
        date,
        app_type,
        oponent_report,
        tutor_opinion,
      } = defenseData;

      // Get the info of the project
      const projectId = new Types.ObjectId(project);
      const project_info = await TesisProjectService.getTesisProjectInfo(
        projectId,
        "true"
      );

      // The project is not active , has been closed or does not exist
      if (!project_info) {
        return null;
      }

      // Get the info of the court
      const courtinfo = await CourtsService.getCourtInfoById(court);

      const courtMembers = courtinfo?.members.map(({ profesor, role }) => ({
        fullname: `${profesor.name} ${profesor.lastname}`,
        role,
      }));

      // Extract the info  that we need of the project
      const {
        general_target,
        functional_requirements,
        scientific_problem,
        topic,
        student,
        tutors,
      } = project_info;

      // Extract names from tutors
      const tutors_names = tutors.map((t) =>
        t.name.concat(" ").concat(t.lastname)
      );

      const student_name = student.name.concat(" ").concat(student.lastname);

      //  Get key words by appType
      const appTypeKeyWords = readAppTypeKeywords(app_type);
      console.log("Apt keywords");

      console.log(appTypeKeyWords);

      let customKeyWords = [...keyWords];

      if (appTypeKeyWords) {
        customKeyWords = [...customKeyWords, ...appTypeKeyWords];
      }
      console.log("Mixed key words");
      console.log(keyWords);

      // Create a new Defense
      const newDefense: Defense = {
        doc_url,
        pres_url,
        metadata: {
          general_target,
          functional_requirements,
          topic,
          tutors: tutors_names,
          student: student_name,
          court: courtMembers || [],
          key_words: customKeyWords || [],
          scientific_problem,
        },
        oponent_report,
        tutor_opinion,
        eval: evaluation,
        recomns: recoms,
        date,
        app_type,
      };

      // Save the new defense record
      await ModelDefense.create(newDefense);

      // ************* CLEAN UP *************************** //
      // Set the project as an old and not active project
      await TesisProjectService.editTesisProject(projectId, {
        ancient: true,
        status: TesisProjectStatus.Closed,
      });

      // Set then student as ancient
      await StudentService.updateStudent(project_info.student.id, {
        ancient: true,
      });

      const studentInfo = await StudentService.getStudentById(
        project_info.student.id
      );
      if (!studentInfo) {
        throw new Error("Error creating the defense, Student not found");
      }

      await UserService.deactivateUser({ userId: studentInfo.user_id });

      return;

      // TODO: // set the student as inactive
    } catch (error: any) {
      // Log the error for debugging purposes
      console.error("Error creating defense:", error);

      // Rethrow the error with a specific message
      throw new Error(`Error creating defense: ${error.message}`);
    }
  }

  static async search(term: string): Promise<Defense[]> {
    try {
      if (term === "all") {
        return ModelDefense.find({}).sort({ createdAt: -1 });
      }
      const searchTermRegExp = new RegExp(term, "i");

      // Define a filter object for the search
      const searchFilter = {
        $or: [
          { app_type: searchTermRegExp },
          { "metadata.general_target": searchTermRegExp },
          { "metadata.functional_requirements": { $in: [searchTermRegExp] } },
          { "metadata.scientific_problem": searchTermRegExp },
          { "metadata.topic": searchTermRegExp },
          { "metadata.tutors": { $in: [searchTermRegExp] } },
          { "metadata.student": searchTermRegExp },
          {
            "metadata.court": {
              $elemMatch: {
                $or: [{ fullname: searchTermRegExp }],
              },
            },
          },
          { "metadata.key_words": { $in: [searchTermRegExp] } },
          // { recomns: searchTermRegExp },
        ],
      };

      // Perform the search using the filter
      const searchResults = await ModelDefense.find(searchFilter).sort({
        date: "desc",
      });

      return searchResults;
    } catch (error: any) {
      console.error("Error during search:", error);
      throw new Error(`Error during search: ${error.message}`);
    }
  }

  static async getDefenseById(id: ObjectId) {
    const defenseDoc = await ModelDefense.findById(id);
    return defenseDoc;
  }
}
