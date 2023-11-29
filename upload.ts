// import { randomUUID } from "crypto";
// import { input_upload_doc_name } from "./src/const.js";
// import MinioService from "../models/MinioService";
// import generateDocUrl from "../utils/generateDocUrl";

// export const uploadFile = async (form: FormData) => {
//   const doc = form.get(input_upload_doc_name) as File;

//   //Load the info of the author of this doc

//   const minio = MinioService.getInstance();
//   const fileName = `${randomUUID()}.${doc.type.split("/")[1]}`;
//   const bucket_name = "academics-docs";
//   const minio_server_filepath = await minio.insertDocument(
//     bucket_name,
//     fileName,
//     doc
//   );

//   const backend_server_file_path = generateDocUrl({
//     bucket_name,
//     file_name: fileName,
//   });
//   console.log(backend_server_file_path);

//   return backend_server_file_path;
// };
