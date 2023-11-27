export var input_upload_doc_name = "doc_file";
export var allowed_formats = [
    "pdf"
];
export var SUPPORTED_LANGUAGE = {
    spanish: "es",
    english: "en"
};
export var FieldOfStudy;
(function(FieldOfStudy) {
    FieldOfStudy["IngenieriaInformatica"] = "Ingenier\xeda Inform\xe1tica";
    FieldOfStudy["IngenieriaElectronica"] = "Ingenier\xeda Electr\xf3nica";
    FieldOfStudy["IngenieriaMecanica"] = "Ingenier\xeda Mec\xe1nica";
    FieldOfStudy["IngenieriaIndustrial"] = "Ingenier\xeda Industrial";
    FieldOfStudy["IngenieriaCivil"] = "Ingenier\xeda Civil";
    FieldOfStudy["IngenieriaQuimica"] = "Ingenier\xeda Qu\xedmica";
    FieldOfStudy["Matematicas"] = "Matem\xe1ticas";
    FieldOfStudy["Fisica"] = "F\xedsica";
    FieldOfStudy["Quimica"] = "Qu\xedmica";
    FieldOfStudy["Biologia"] = "Biolog\xeda";
    FieldOfStudy["Medicina"] = "Medicina";
    FieldOfStudy["Derecho"] = "Derecho";
    FieldOfStudy["Economia"] = "Econom\xeda";
    FieldOfStudy["Psicologia"] = "Psicolog\xeda";
    FieldOfStudy["CienciasdelaComputacion"] = "Ciencias de la Computaci\xf3n";
    FieldOfStudy["Arquitectura"] = "Arquitectura";
    FieldOfStudy["Arte"] = "Arte";
    FieldOfStudy["CienciasPoliticas"] = "Ciencias Pol\xedticas";
})(FieldOfStudy || (FieldOfStudy = {}));
export var Degree;
(function(Degree) {
    Degree["Licenciatura"] = "Licenciatura";
    Degree["Maestr\xeda"] = "Maestr\xeda";
    Degree["Doctorado"] = "Doctorado";
    Degree["IngenieriaInformatica"] = "Ingenier\xeda Inform\xe1tica";
})(Degree || (Degree = {}));
export var Department;
(function(Department) {
    Department["IngenieriaInformatica"] = "Ingenier\xeda Inform\xe1tica";
})(Department || (Department = {}));
export var Institutions;
(function(Institutions) {
    Institutions["UPR"] = "Universidad Hermanos Saiz Montes de Oca";
})(Institutions || (Institutions = {}));
export var CourtRole;
(function(CourtRole) {
    CourtRole["Presidente"] = "presidente";
    CourtRole["Secretario"] = "secretario";
    CourtRole["Vocal"] = "vocal";
})(CourtRole || (CourtRole = {}));
export var Sex;
(function(Sex) {
    Sex["Female"] = "female";
    Sex["Male"] = "male";
})(Sex || (Sex = {}));
export var RangoAcademico;
(function(RangoAcademico) {
    RangoAcademico["CANDIDATO_DE_MAESTRIA"] = "Candidato de Maestr\xeda";
    RangoAcademico["GRADUADO_DE_MAESTRIA"] = "Graduado de Maestr\xeda";
    RangoAcademico["CANDIDATO_DE_DOCTORADO"] = "Candidato de Doctorado";
    RangoAcademico["GRADUADO_DE_DOCTORADO"] = "Graduado de Doctorado";
    RangoAcademico["INVESTIGADOR_POSDOCTORAL"] = "Investigador Posdoctoral";
    RangoAcademico["PROFESOR_ASISTENTE"] = "Profesor Asistente";
    RangoAcademico["PROFESOR_ASOCIADO"] = "Profesor Asociado";
    RangoAcademico["PROFESOR"] = "Profesor";
})(RangoAcademico || (RangoAcademico = {}));
export var TesisProjectStatus;
(function(TesisProjectStatus) {
    TesisProjectStatus["Pending"] = "pending";
    TesisProjectStatus["Approved"] = "approved";
    TesisProjectStatus["Closed"] = "closed";
})(TesisProjectStatus || (TesisProjectStatus = {}));
export var EvalType;
(function(EvalType) {
    EvalType["CorteEvaluativo"] = "corte evaluativo";
    EvalType["Predefensa"] = "predefensa";
})(EvalType || (EvalType = {}));
export var EvalStatus;
(function(EvalStatus) {
    EvalStatus["Open"] = "open";
    EvalStatus["Close"] = "close";
})(EvalStatus || (EvalStatus = {}));
export var UserRole;
(function(UserRole) {
    UserRole["Profesor"] = "profesor";
    UserRole["Student"] = "student";
    UserRole["Admin"] = "admin";
})(UserRole || (UserRole = {}));
export var Routes;
(function(Routes) {
    Routes["auth"] = "/api/auth";
    Routes["student"] = "/api/student";
})(Routes || (Routes = {}));
export var EMAIL_DOMAIN = "onboarding@resend.dev";
