import { Schema } from "mongoose";
import { ErrorHandlerFactory } from "../errors/error.js";
import { ModelProfesor, ProfesorType } from "../models/Profesor.js";

export class ProfesorService {
  private static Profesor = ModelProfesor;
  private static ErrorFactory = ErrorHandlerFactory;

  static async createProfesor(
    profesorData: ProfesorType
  ): Promise<ProfesorType> {
    const isUnique = await this.isProfessorUnique(
      profesorData.email,
      profesorData.ci
    );

    if (!isUnique) throw new Error("Duplicated email or ci");

    const createdProfesor = await this.Profesor.create(profesorData);
    return createdProfesor.toObject();
  }

  static async getProfesores(): Promise<ProfesorType[]> {
    const profesores = await this.Profesor.find();
    return profesores.map((profesor) => profesor.toObject());
  }

  static async getProfesorById(
    profesorId: string
  ): Promise<ProfesorType | null> {
    const profesor = await this.Profesor.findById(profesorId);
    return profesor ? profesor.toObject() : null;
  }
  static async updateProfesor(
    profesorId: string,
    profesorData: ProfesorType
  ): Promise<ProfesorType | null> {
    // Verify that is unique
    const isUnique = await this.isProfessorUnique(
      profesorData.email,
      profesorData.ci,
      profesorId
    );
    if (!isUnique) throw new Error("Duplicated email or ci");

    const updatedProfesor = await this.Profesor.findByIdAndUpdate(
      profesorId,
      profesorData,
      { new: true }
    );
    return updatedProfesor ? updatedProfesor.toObject() : null;
  }

  static async deleteProfesor(
    profesorId: string
  ): Promise<Schema.Types.ObjectId> {
    const deletedProfesor = await this.Profesor.findByIdAndUpdate(
      profesorId,
      {
        ancient: true,
      },
      { new: true }
    );
    if (!deletedProfesor) throw new Error("Professor not found for deletion");

    return deletedProfesor._id;
  }

  static async isProfessorUnique(
    email?: string,
    ci?: string,
    excludeProfessorId?: string
  ): Promise<boolean> {
    try {
      // Query to find professors with the same email or CI
      const existingProfessor = await this.Profesor.findOne({
        $or: [{ email: email?.toLowerCase() }, { ci: ci?.toLowerCase() }],
        _id: { $ne: excludeProfessorId }, // Exclude the current professor if an ID is provided
      });

      // If there's an existing professor, it's not unique
      return !existingProfessor;
    } catch (error) {
      console.log(error);

      throw this.ErrorFactory.createError(
        new Error("Error checking professor uniqueness")
      );
    }
  }

  static async doesProfessorExist(
    filter: Partial<ProfesorType>
  ): Promise<boolean> {
    try {
      // Check if a professor exists based on the provided filter
      const existingProfessor = await this.Profesor.findOne(filter);

      return !!existingProfessor; // Returns true if the professor exists, false otherwise
    } catch (error) {
      throw this.ErrorFactory.createError(
        new Error("Error checking professor existence")
      );
    }
  }
  // To verife that a profesor is unique ,by email and ci
}
