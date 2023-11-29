import { allowed_formats } from "../const.js";
import { getMinioConfig } from "../helpers/minio.js";
import { Client, ClientOptions, ItemBucketMetadata } from "minio";
import { Readable } from "stream";
import * as zlib from "zlib";

export default class MinioService {
  private static instance: MinioService;
  private minioClient: Client;

  private constructor(config?: ClientOptions) {
    const defaultConfig: ClientOptions = {
      ...getMinioConfig(),
      useSSL: false,
    };

    this.minioClient = new Client({ ...defaultConfig, ...config });
  }

  private static getInstance(config?: ClientOptions): MinioService {
    if (!MinioService.instance) {
      MinioService.instance = new MinioService(config);
    }

    return MinioService.instance;
  }

  private handleError(operation: string, error: any): never {
    const err = error as Error;
    throw new Error(`Error ${operation}: ${err.message}`);
  }

  // Function to validate the docs format
  private validateDocumentFormat(fileName: string): void {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    if (!fileExtension || !allowed_formats.includes(fileExtension)) {
      throw new Error(
        `Invalid document format. Allowed formats: ${allowed_formats.join(
          ", "
        )}`
      );
    }
  }

  // Convert a File object to a buufer
  private async readFile(file: File): Promise<Buffer> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      return this.handleError("reading file content", error);
    }
  }

  // Function to compress a buffer
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

  // Functioo to updload a document
  private async insertDocument(
    bucketName: string,
    fileName: string,
    file: File,
    metadata?: Record<string, string>
  ): Promise<string> {
    try {
      // Validate the document format
      this.validateDocumentFormat(file.name);

      // Convert the File object to a Buffer
      const fileBuffer = await this.readFile(file);

      //Create Metadata
      const metadata: ItemBucketMetadata = {
        "Content-Type": file.type,
        // 'X-Amz-Meta-Your-Custom-Metadata': JSON.stringify(metadata),
      };

      // Compress the document using zlib
      // const compressedBuffer = await this.compressDocument(fileBuffer);

      // Upload the document
      await this.minioClient.putObject(
        bucketName,
        fileName,
        fileBuffer,
        metadata
      );

      const { endPoint, useSSL, port } = getMinioConfig();
      // Generate and return the download URL
      const fileURL = `${
        useSSL ? "https" : "http"
      }//${endPoint}:${port}/${bucketName}/${fileName}`;

      return fileURL;
    } catch (error) {
      this.handleError("inserting document", error);
    }
  }

  private async listBuckets(): Promise<string[]> {
    try {
      const buckets = await this.minioClient.listBuckets();
      return buckets.map((bucket) => bucket.name);
    } catch (error) {
      this.handleError("listing buckets", error);
    }
  }

  private async uploadFile(
    bucketName: string,
    fileName: string,
    filePath: string
  ): Promise<void> {
    try {
      await this.minioClient.fPutObject(bucketName, fileName, filePath, {});
    } catch (error) {
      this.handleError("uploading file", error);
    }
  }

  private async getFile(
    bucketName: string,
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

  private async getFiles(bucketName: string) {
    try {
      const files = this.minioClient.listObjects(bucketName, "", true);
      return files;
    } catch (error) {
      this.handleError("getting files", error);
    }
  }
}
