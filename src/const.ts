export const input_upload_doc_name = "doc_file";
export const allowed_formats = ["pdf"];

export const SUPPORTED_LANGUAGE = {
  spanish: "es",
  english: "en",
};

export enum FieldOfStudy {
  IngenieriaInformatica = "Ingeniería Informática",
  IngenieriaElectronica = "Ingeniería Electrónica",
  IngenieriaMecanica = "Ingeniería Mecánica",
  IngenieriaIndustrial = "Ingeniería Industrial",
  IngenieriaCivil = "Ingeniería Civil",
  IngenieriaQuimica = "Ingeniería Química",
  Matematicas = "Matemáticas",
  Fisica = "Física",
  Quimica = "Química",
  Biologia = "Biología",
  Medicina = "Medicina",
  Derecho = "Derecho",
  Economia = "Economía",
  Psicologia = "Psicología",
  CienciasdelaComputacion = "Ciencias de la Computación",
  Arquitectura = "Arquitectura",
  Arte = "Arte",
  CienciasPoliticas = "Ciencias Políticas",
}

export enum Degree {
  Licenciatura = "Licenciatura",
  Maestría = "Maestría",
  Doctorado = "Doctorado",
  IngenieriaInformatica = "Ingeniería Informática",
}

// Enum para los departamentos
export enum Department {
  IngenieriaInformatica = "Ingeniería Informática",
  // Agrega otros departamentos según sea necesario
}

export enum Institutions {
  UPR = "Universidad Hermanos Saiz Montes de Oca",
}

export enum CourtRole {
  Presidente = "presidente",
  Secretario = "secretario",
  Vocal = "vocal",
  Oponente = "oponente",
}
export enum Sex {
  Female = "female",
  Male = "male",
}

export enum RangoAcademico {
  ADIESTRADO = "adiestrado",
  AUXILIAR = "auxiliar",
  INSTRUCTOR = "instructor",
  ASISTENTE = "asistente",
  TITULAR = "titular",
  NUEVO = "nuevo",
}

export enum TesisProjectStatus {
  Pending = "pending",
  Approved = "approved",
  Closed = "closed",
}

export enum EvalType {
  CorteEvaluativo = "corte_evaluativo",
  Predefensa = "predefensa",
}

export enum EvalStatus {
  Open = "open",
  Close = "close",
}
export enum UserRole {
  Profesor = "profesor",
  Student = "student",
  Admin = "admin",
}

export enum Routes {
  auth = "/api/auth",
  student = "/api/student",
  tesis_project = "/api/project",
  profesor = "/api/profesor",
  court = "/api/court",
  search = "/api/search",
  eval = "/api/evaluaciones",
  files = "/api/files",
  defense = "/api/defense",
  aranks = "/api/academic-ranks",
}

export enum Allowedcollections {
  students = "students",
  docs = "docs",
}

export const EvalAllowedExtensions = [
  "ppt",
  "pptx",
  "pdf",
  "doc",
  "docx",
  "zip",
  "rar",
];

export enum BucketsS3 {
  Evaluaciones = "evaluaciones",
  AcademicDocs = "docs",
}

export enum CursoType {
  CRD = "curso diurno",
  CPE = "curso por encuentro",
}

export enum CursoAlias {
  CRD = "CRD",
  CPE = "CPE",
}

// Enum-like object for App Types
export enum AppTypes {
  WEB_APPLICATION = "web_application",
  MOBILE_APP = "mobile_app",
  DESKTOP_APPLICATION = "desktop_application",
  SERVER_SIDE_APPLICATION = "server_side_application",
  HYBRID_APP = "hybrid_app",
}
