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
    CourtRole["Oponente"] = "oponente";
})(CourtRole || (CourtRole = {}));
export var Sex;
(function(Sex) {
    Sex["Female"] = "female";
    Sex["Male"] = "male";
})(Sex || (Sex = {}));
export var RangoAcademico;
(function(RangoAcademico) {
    RangoAcademico["ADIESTRADO"] = "adiestrado";
    RangoAcademico["AUXILIAR"] = "auxiliar";
    RangoAcademico["INSTRUCTOR"] = "instructor";
    RangoAcademico["ASISTENTE"] = "asistente";
    RangoAcademico["TITULAR"] = "titular";
    RangoAcademico["NUEVO"] = "nuevo";
})(RangoAcademico || (RangoAcademico = {}));
export var TesisProjectStatus;
(function(TesisProjectStatus) {
    TesisProjectStatus["Pending"] = "pending";
    TesisProjectStatus["Approved"] = "approved";
    TesisProjectStatus["Closed"] = "closed";
})(TesisProjectStatus || (TesisProjectStatus = {}));
export var EvalType;
(function(EvalType) {
    EvalType["CorteEvaluativo"] = "corte_evaluativo";
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
    Routes["tesis_project"] = "/api/project";
    Routes["profesor"] = "/api/profesor";
    Routes["court"] = "/api/court";
    Routes["search"] = "/api/search";
    Routes["eval"] = "/api/evaluaciones";
    Routes["files"] = "/api/files";
    Routes["defense"] = "/api/defense";
    Routes["aranks"] = "/api/academic-ranks";
})(Routes || (Routes = {}));
export var Allowedcollections;
(function(Allowedcollections) {
    Allowedcollections["students"] = "students";
    Allowedcollections["docs"] = "docs";
})(Allowedcollections || (Allowedcollections = {}));
export var EvalAllowedExtensions = [
    "ppt",
    "pptx",
    "pdf",
    "doc",
    "docx",
    "zip",
    "rar"
];
export var BucketsS3;
(function(BucketsS3) {
    BucketsS3["Evaluaciones"] = "evaluaciones";
    BucketsS3["AcademicDocs"] = "docs";
})(BucketsS3 || (BucketsS3 = {}));
export var CursoType;
(function(CursoType) {
    CursoType["CRD"] = "curso diurno";
    CursoType["CPE"] = "curso por encuentro";
})(CursoType || (CursoType = {}));
export var CursoAlias;
(function(CursoAlias) {
    CursoAlias["CRD"] = "CRD";
    CursoAlias["CPE"] = "CPE";
})(CursoAlias || (CursoAlias = {}));
export var AppTypes;
(function(AppTypes) {
    AppTypes["WEB_APPLICATION"] = "web_application";
    AppTypes["MOBILE_APP"] = "mobile_app";
    AppTypes["DESKTOP_APPLICATION"] = "desktop_application";
    AppTypes["SERVER_SIDE_APPLICATION"] = "server_side_application";
    AppTypes["HYBRID_APP"] = "hybrid_app";
})(AppTypes || (AppTypes = {}));
