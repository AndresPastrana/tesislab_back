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
}
export enum Sex {
  Female = "female",
  Male = "male",
}

export enum RangoAcademico {
  CANDIDATO_DE_MAESTRIA = "Candidato de Maestría",
  GRADUADO_DE_MAESTRIA = "Graduado de Maestría",
  CANDIDATO_DE_DOCTORADO = "Candidato de Doctorado",
  GRADUADO_DE_DOCTORADO = "Graduado de Doctorado",
  INVESTIGADOR_POSDOCTORAL = "Investigador Posdoctoral",
  PROFESOR_ASISTENTE = "Profesor Asistente",
  PROFESOR_ASOCIADO = "Profesor Asociado",
  PROFESOR = "Profesor",
}

export enum TesisProjectStatus {
  Pending = "pending",
  Approved = "approved",
  Closed = "closed",
}

export enum EvalType {
  CorteEvaluativo = "corte evaluativo",
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
}

export const EMAIL_DOMAIN = "onboarding@resend.dev";
