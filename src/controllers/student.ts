import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StudentType } from "../models/Student.js";
import { UserRole } from "../const.js";
import {
  EmailService,
  StudentService,
  UserService,
} from "../services/index.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { handleResponse } from "../middleware/handleResponse.js";
import { htmlTemplateCred } from "../helpers/html.js";

export const StudentController = {
  createStudent: async (req: Request, res: Response) => {
    try {
      const studentData = matchedData(req, {
        locations: ["body"],
      }) as StudentType;

      //   Creates the new user
      const newUser = await UserService.registerUser({
        role: UserRole.Student,
        email: studentData.email,
      });

      //   Creates the new student
      const createdStudent = await StudentService.createStudent({
        ...studentData,
        user_id: newUser.user.id,
      });

      // Send the email with the credentials
      const email = await EmailService.sendEmail({
        to: createdStudent.email,
        html: `${htmlTemplateCred(
          newUser.user.username,
          newUser.user.password
        )}`,
      });
      handleResponse({
        statusCode: 201,
        msg: "Student created successfully",
        data: createdStudent,
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error creating student",
        error: customError,
        res,
      });
    }
  },

  getStudents: async (req: Request, res: Response) => {
    try {
      const students = await StudentService.getStudents();
      handleResponse({
        statusCode: 200,
        msg: "Students retrieved successfully",
        data: students,
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error retrieving students",
        error: customError,
        res,
      });
    }
  },

  getStudentById: async (req: Request, res: Response) => {
    try {
      const studentId = req.params.id;
      const student = await StudentService.getStudentById(studentId);

      if (!student) {
        handleResponse({
          statusCode: 404,
          msg: "Student not found",
          res,
        });
        return;
      }

      handleResponse({
        statusCode: 200,
        msg: "Student retrieved successfully",
        data: student,
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error retrieving student",
        error: customError,
        res,
      });
    }
  },

  updateStudent: async (req: Request, res: Response) => {
    try {
      const studentId = req.params.id;
      const studentData = req.body;
      const updatedStudent = await StudentService.updateStudent(
        studentId,
        studentData
      );

      if (!updatedStudent) {
        handleResponse({
          statusCode: 404,
          msg: "Student not found",
          res,
        });
        return;
      }

      handleResponse({
        statusCode: 200,
        msg: "Student updated successfully",
        data: updatedStudent,
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error updating student",
        error: customError,
        res,
      });
    }
  },

  deleteStudent: async (req: Request, res: Response) => {
    try {
      const studentId = req.params.id;
      await StudentService.deleteStudent(studentId);
      handleResponse({
        statusCode: 204,
        msg: "Student deleted successfully",
        res,
      });
    } catch (error: any) {
      const customError = ErrorHandlerFactory.createError(error);
      handleResponse({
        statusCode: 500,
        msg: "Error deleting student",
        error: customError,
        res,
      });
    }
  },
};
