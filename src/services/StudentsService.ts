// Create a new Student

import AuthService from "./Auth.js";
import PersonService from "./PersonService.js";
import { ModelStudent } from "../models/Student.js";
import { UserRole } from "../const.js";

type InputCreateStudent = {
  ci: string;
  name: string;
  lastname: string;
  address: string;
  age: number;
  phone: string;
  sex: string;
  email: string;
  language_certificate: Boolean;
};

export default class StudentService {
  static async createStudent({
    email,
    language_certificate,
    name,
    lastname,
    address,
    ci,
    age,
    phone,
    sex,
  }: InputCreateStudent) {
    // Uses the Auth Service to create a new user
    const user_id = await AuthService.register({
      role: UserRole.Student,
      email,
    });

    console.log("User saved");

    console.log("Usuario creado.....");

    // Create a new person and la asocia con el user_id del usuario creado
    const person_info = await PersonService.createPerson({
      user_id,
      name,
      lastname,
      address,
      age,
      ci,
      phone,
      sex,
    });
    console.log("Persona creada....");

    // Create the new student and lo asocia con la person creada
    const newStudent = await ModelStudent.create({
      language_certificate,
      person_info,
    });

    return newStudent.toObject();
  }
}
// Edit A Student

// Delete a student ,Revives the student id, Set the user as incative and the Student.amcient = true

// Get hitorial , Recives the student id
