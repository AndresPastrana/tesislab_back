import { Schema } from "mongoose";
import { UserRole } from "../const.js";
import { Defense, ModelDefense } from "../models/Defensa.js";
import { TesisProjectService, PopulatedTesisResponse } from "./TesisProject.js";

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
  static async createDefense(defenseData: {
    studentId: Schema.Types.ObjectId;
    key_words: string[];
    recoms: string;
    evaluation: number;
    doc_url: string;
    pres_url: string;
    court: string[];
  }): Promise<void> {
    try {
      const {
        studentId,
        key_words,
        recoms,
        evaluation,
        doc_url,
        pres_url,
        court,
      } = defenseData;

      // Get the info of the project
      const project_info = (await TesisProjectService.getProjectsByMemberId(
        "true",
        studentId,
        UserRole.Student
      )) as PopulatedTesisResponse;

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
          court,
          key_words,
          scientific_problem,
        },
        eval: evaluation,
        recomns: recoms,
        date: new Date(),
      };

      // Save the new defense record
      const createdDefense = await ModelDefense.create(newDefense);

      // Log the created defense
      console.log("Created Defense:", createdDefense);
    } catch (error: any) {
      // Log the error for debugging purposes
      console.error("Error creating defense:", error);

      // Rethrow the error with a specific message
      throw new Error(`Error creating defense: ${error.message}`);
    }
  }
}
