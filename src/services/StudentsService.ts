import { Model, Document } from "mongoose";

import { ModelStudent, StudentType } from "../models/Student.js";
import { ErrorHandlerFactory } from "../errors/error.js";

export class StudentService {
  private static Student: Model<StudentType & Document> = ModelStudent;
  private static ErrorFactory = ErrorHandlerFactory;

  static async createStudent(studentData: StudentType): Promise<StudentType> {
    try {
      const createdStudent = await this.Student.create(studentData);
      return createdStudent.toObject() as StudentType;
    } catch (error) {
      throw this.ErrorFactory.createError(error as Error);
    }
  }

  static async getStudents(): Promise<StudentType[]> {
    try {
      const students = await this.Student.find();
      return students.map((student) => student.toObject() as StudentType);
    } catch (error) {
      throw this.ErrorFactory.createError(error as Error);
    }
  }

  static async getStudentById(studentId: string): Promise<StudentType | null> {
    try {
      const student = await this.Student.findById(studentId);
      return student ? (student.toObject() as StudentType) : null;
    } catch (error) {
      throw this.ErrorFactory.createError(error as Error);
    }
  }

  static async updateStudent(
    studentId: string,
    studentData: StudentType
  ): Promise<StudentType | null> {
    try {
      const updatedStudent = await this.Student.findByIdAndUpdate(
        studentId,
        studentData,
        { new: true }
      );
      return updatedStudent ? (updatedStudent.toObject() as StudentType) : null;
    } catch (error) {
      throw this.ErrorFactory.createError(error as Error);
    }
  }

  static async deleteStudent(studentId: string): Promise<void> {
    try {
      await this.Student.findByIdAndDelete(studentId);
    } catch (error) {
      throw this.ErrorFactory.createError(error as Error);
    }
  }
}
