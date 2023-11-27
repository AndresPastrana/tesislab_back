import { ErrorHandlerFactory } from "../errors/error.js";
import { ModelProfesor, ProfesorType } from "../models/Profesor.js";

export class ProfesorService {
  private static Profesor = ModelProfesor;
  private static ErrorFacatory = ErrorHandlerFactory;

  static async createProfesor(
    profesorData: ProfesorType
  ): Promise<ProfesorType> {
    try {
      const createdProfesor = await this.Profesor.create(profesorData);
      return createdProfesor.toObject();
    } catch (error) {
      throw this.ErrorFacatory.createError(error as Error);
    }
  }

  static async getProfesores(): Promise<ProfesorType[]> {
    try {
      const profesores = await this.Profesor.find();
      return profesores.map((profesor) => profesor.toObject());
    } catch (error) {
      throw this.ErrorFacatory.createError(error as Error);
    }
  }

  static async getProfesorById(
    profesorId: string
  ): Promise<ProfesorType | null> {
    try {
      const profesor = await this.Profesor.findById(profesorId);
      return profesor ? profesor.toObject() : null;
    } catch (error) {
      throw this.ErrorFacatory.createError(error as Error);
    }
  }

  static async updateProfesor(
    profesorId: string,
    profesorData: ProfesorType
  ): Promise<ProfesorType | null> {
    try {
      const updatedProfesor = await this.Profesor.findByIdAndUpdate(
        profesorId,
        profesorData,
        { new: true }
      );
      return updatedProfesor ? updatedProfesor.toObject() : null;
    } catch (error) {
      throw this.ErrorFacatory.createError(error as Error);
    }
  }

  static async deleteProfesor(profesorId: string): Promise<void> {
    try {
      await this.Profesor.findByIdAndDelete(profesorId);
    } catch (error) {
      throw this.ErrorFacatory.createError(error as Error);
    }
  }
}
