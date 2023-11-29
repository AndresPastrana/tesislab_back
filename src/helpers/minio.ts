import { ClientOptions } from "minio";
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
  const api_path = "api/docs-server";
  const host = "http://localhost:3000";
  return `${host}/${api_path}?bucket_name=${bucket_name}&file_name=${file_name}`;
};
