import { Schema } from "mongoose";
import {
  CourtRole,
  Degree,
  Department,
  EvalStatus,
  EvalType,
  FieldOfStudy,
  Institutions,
  RangoAcademico,
  TesisProjectStatus,
  UserRole,
} from "../const";

export type AcademicDocType = {
  id: string;
  // Other's collections references
  author: string;
  supervisor: string;
  committee: string[];

  //User's selection
  degree: Degree;
  institution: Institutions;
  fieldOfStudy: FieldOfStudy;
  department: Department;

  //Scrap from the pdf
  title: string;
  keywords: string[];
  abstract: string;
  conclusion: string;
  references: string[];

  // Auto Generado
  fileUrl: string;
  defenseDate: Date;
};

export type AppTypeKeywords = {
  [key in AppTypes]: string[];
};
