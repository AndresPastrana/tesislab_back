import { ObjectId, Types } from "mongoose";

import {
  Defense,
  DefenseData,
  DefenseType,
  ModelDefense,
} from "../models/Defensa.js";
import { TesisProjectService, PopulatedTesisResponse } from "./TesisProject.js";
import { CourtsService } from "./CourtService.js";
import { TesisProjectStatus } from "../const.js";
import { StudentService } from "./StudentsService.js";
import { UserService } from "./User.js";

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
    defenseData: DefenseData & { doc_url: string; pres_url: string }
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
          key_words: keyWords || [],
          scientific_problem, // Added scientific_problem to metadata
        },
        eval: evaluation,
        recomns: recoms,
        date,
      };

      // Save the new defense record
      const p = await ModelDefense.create(newDefense);

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
      const searchTermRegExp = new RegExp(term, "i");

      // Define a filter object for the search
      const searchFilter = {
        $or: [
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
          { recomns: searchTermRegExp },
        ],
      };

      console.log("Filter terms");
      console.log(searchFilter);

      // Perform the search using the filter
      const searchResults = await ModelDefense.find(searchFilter);

      // Log the search results
      console.log("Search Results:", searchResults);

      return searchResults;
    } catch (error: any) {
      console.log(error);

      console.error("Error during search:", error);
      throw new Error(`Error during search: ${error.message}`);
    }
  }

  static async getDefenseById(id: ObjectId) {
    const defenseDoc = await ModelDefense.findById(id);
    return defenseDoc;
  }
}
