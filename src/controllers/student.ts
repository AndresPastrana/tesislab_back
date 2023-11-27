import { Request, Response } from "express";
import { matchedData } from "express-validator";
import StudentService from "../services/StudentsService.js";
import { Sex, UserRole } from "../const.js";
import EmailService from "../services/EmailService.js";

const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      email,
      ci,
      name,
      lastname,
      phone,
      sex,
      address,
      language_certificate,
    } = matchedData(req, { locations: ["body"] });

    console.log(`Validate date `);
    console.log(matchedData(req));

    const student = await StudentService.createStudent({
      email,
      ci,
      name,
      lastname,
      phone,
      sex,
      address,
      language_certificate,
      age: 34,
    });

    const data = EmailService.sendEmail({
      htmlMessage: "<h1>Hola desde tesis lab</h1>",
      subject: "Asunto",
      to: ["andreserluis@gmail.com"],
    });

    //TODO: Once here use the email service to send the user his credentials to access the system

    return res.json({ student });
  } catch (error) {}
};

const ControllerStudent = { createStudent };
export default ControllerStudent;
