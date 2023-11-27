//   GET   /students
// Just an admin can get al the students

import { Router } from "express";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { Sex, UserRole } from "../const.js";
import { isValidToken } from "../middleware/jwt.js";
import { validateRequest } from "../middleware/validate.js";
import ControllerStudent from "../controllers/student.js";
import { body } from "express-validator";

//   GET   /student/project-tesis/:id
//   GET   /student/historial/:id
//   GET   /student/evaluation/:id
//   GET   /student/:id

export const router: Router = Router();

const authValidations = [isValidToken, protectRouteByRole([UserRole.Admin])];

const userValidations = [body("email").isString().isEmail()];

const studentValidations = [body("language_certificate").isBoolean()];

const personDataValidations = [
  body("ci").notEmpty(),
  body("name").trim().escape().notEmpty().isString(),
  body("lastname").trim().escape().notEmpty().isString(),
  body("phone").notEmpty().isNumeric().isLength({ min: 8, max: 8 }),
  body("sex").isIn(Object.values(Sex)),
  body("address").notEmpty().isString(),
];

router.post(
  "/create",
  [
    // ...authValidations,
    ...userValidations,
    ...personDataValidations,
    ...studentValidations,
    // validateRequest,
  ],
  ControllerStudent.createStudent
);

// Create student controller
// Recives all the user info data
// Recives all the person data,
// Recives the student specific data

// Register the new User
// Creates the new Person
// Create the new Student
