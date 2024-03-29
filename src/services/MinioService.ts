import { getMinioConfig } from "../helpers/minio.js";
import { Client, ClientOptions } from "minio";
import { Readable } from "stream";
import * as zlib from "zlib";
import { BucketsS3 } from "../const.js";

export default class MinioService {
  private static instance: MinioService;
  private minioClient: Client;

  // Private methods
  private constructor(config?: ClientOptions) {
    const defaultConfig: ClientOptions = {
      ...getMinioConfig(),
      ...config,
      useSSL: false,
    };

    this.minioClient = new Client({ ...defaultConfig });
  }

  private async compressDocument(buffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const zlibStream = zlib.createDeflate();
      const readable = Readable.from([buffer]);

      readable.pipe(zlibStream);

      const chunks: Buffer[] = [];
      zlibStream.on("data", (chunk) => chunks.push(chunk));
      zlibStream.on("end", () => resolve(Buffer.concat(chunks)));
      zlibStream.on("error", (error) =>
        reject(new Error(`Error compressing document: ${error.message}`))
      );
    });
  }
  private handleError(operation: string, error: any): never {
    const err = error as Error;
    throw new Error(`Error ${operation}: ${err.message}`);
  }

  // Static methods
  static getInstance(config?: ClientOptions): MinioService {
    if (!MinioService.instance) {
      MinioService.instance = new MinioService(config);
    }

    return MinioService.instance;
  }

  // Instance methods
  async listBuckets(): Promise<string[]> {
    try {
      const buckets = await this.minioClient.listBuckets();
      return buckets.map((bucket) => bucket.name);
    } catch (error) {
      this.handleError("listing buckets", error);
    }
  }

  async uploadFile(
    bucketName: BucketsS3,
    fileName: string,
    file: Buffer
  ): Promise<void> {
    try {
      await this.minioClient.putObject(bucketName, fileName, file, {});
    } catch (error) {
      this.handleError("uploading file", error);
    }
  }

  async getFile(
    bucketName: BucketsS3,
    fileName: string
  ): Promise<Buffer | null> {
    try {
      const fileStream = await this.minioClient.getObject(bucketName, fileName);
      const chunks: Buffer[] = [];

      return new Promise((resolve, reject) => {
        fileStream.on("data", (chunk) => chunks.push(chunk));
        fileStream.on("end", () => resolve(Buffer.concat(chunks)));
        fileStream.on("error", (error) => reject(error));
      });
    } catch (error) {
      this.handleError("getting file", error);
    }
  }
  async deleteFile(bucketName: BucketsS3, fileName: string) {
    try {
      await this.minioClient.removeObject(bucketName, fileName, {
        forceDelete: true,
      });
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error deleting file ${fileName} in the bucket ${bucketName} in th  MinIO Server`
      );
    }
  }

  private async getFiles(bucketName: BucketsS3) {
    try {
      const files = this.minioClient.listObjects(bucketName, "", true);
      return files;
    } catch (error) {
      this.handleError("getting files", error);
    }
  }
}
