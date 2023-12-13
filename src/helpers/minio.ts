import { ClientOptions } from "minio";
import { getUniqueFileName } from "./files.js";
import MinioService from "../services/MinioService.js";
import { BucketsS3, Routes } from "../const.js";
export const getMinioConfig = (): ClientOptions => {
  const endPoint = process.env.MINIO_SERVER_URL as string;
  const port = process.env.MINIO_SERVER_PORT as string;
  const accessKey = process.env.MINIO_ACCESS_KEY as string;
  const secretKey = process.env.MINIO_SECRET_KEY as string;
  return {
    endPoint,
    accessKey,
    secretKey,
    port: Number(port),
  };
};

export const generateDocUrl = ({
  bucket_name,
  file_name,
}: {
  bucket_name: string;
  file_name: string;
}) => {
  const path = `http://localhost:23274${Routes.files}/${bucket_name}/${file_name}`;
  return path;
};

export const uploadFile = async (file: Express.Multer.File) => {
  // Rename file with a unique name
  file.originalname = getUniqueFileName(file);

  const minio = MinioService.getInstance();
  await minio.uploadFile(
    BucketsS3.Evaluaciones,
    file.originalname,
    file.buffer
  );
  return generateDocUrl({
    bucket_name: BucketsS3.Evaluaciones,
    file_name: file.originalname,
  });
};
