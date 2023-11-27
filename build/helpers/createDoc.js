import fs from "node:fs";
import PDFDocument from "pdfkit";
export function createDoc(param) {
    var _param_filename = param.filename, filename = _param_filename === void 0 ? "file.pdf" : _param_filename, data = param.data;
    return new Promise(function(resolve, reject) {
        // Create a document
        var doc = new PDFDocument();
        // Pipe the PDF document to a writable stream
        var stream = fs.createWriteStream(filename);
        doc.pipe(stream);
        // Add content to the PDF
        var ID = data.ID, status = data.status, department = data.department, destiny = data.destiny, _data_aprovedBy = data.aprovedBy, aprovedBy = _data_aprovedBy === void 0 ? "" : _data_aprovedBy;
        doc.text("Request Id: ".concat(ID), {
            align: "left"
        });
        doc.text("Status: ".concat(status), {
            align: "left"
        });
        doc.text("Department: ".concat(department), {
            align: "left"
        });
        doc.text("Destiny: ".concat(destiny), {
            align: "left"
        });
        doc.text("Aproved by: ".concat(aprovedBy), {
            align: "left"
        });
        doc.end();
        resolve(doc);
    });
}
