import { Document, Schema, Types } from "mongoose";
import { ModelDefense, DefenseType } from "../models/Defensa.js"; // Adjust the path to your Defense model
import { ModelTesisProject } from "../models/TesisProject.js";

interface TesisProjectInfo extends Document {
  student: {
    name: string;
    _id: Schema.Types.ObjectId;
  };
  tutors: Array<{
    name: string;
    lastname: string;
    _id: Schema.Types.ObjectId;
  }>;
}

export class DefenseService {
  private static Defense = ModelDefense;

  static async createDefense(
    defenseData: Partial<DefenseType> & { proyect_id: Types.ObjectId },
    courtId: Schema.Types.ObjectId
  ): Promise<DefenseType> {
    const {
      proyect_id,
      doc_url,
      pres_url,
      recomns,
      eval: evaluation,
    } = defenseData;

    // Get the name,lastname of students and profesor
    const proyect_info = (await ModelTesisProject.findById(proyect_id)
      .select("student tutors")
      .populate("student", "name lastname")
      .populate("tutors", "name lastname")) as TesisProjectInfo;

    // TODO: map the result to get the tutors as an array of a single string bt tutors
    const tutorsRefactorArray = proyect_info.tutors.map((t) => {
      const fullName = "";
      return fullName.concat(t.name, " ", t.lastname);
    });

    //TODO: Get the info of the court members with the send it id with the CourtService

    //
    // This will recive:
    // the id of the tesis project
    //The recoms
    // The doc_url
    // The pres_url
    // The eval
    try {
      //TODO: Get the student that is doing this thesis project
      //TODO: Get the tutors of the thesis project
      //TODO: Get the names and the lastnames of the members of the roles

      const createdDefense = await this.Defense.create(defenseData);
      return createdDefense.toObject();
    } catch (error: any) {
      throw new Error(`Error in defense service , ${error.message}`);
    }
  }

  // TODO:
  // student name
  //tutores o tutor
  // tribunal

  static async getReportInfo() {}
}
