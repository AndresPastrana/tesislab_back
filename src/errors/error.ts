export interface CustomError {
  name: string;
  message: string;
}

class ValidationError implements CustomError {
  name: string;
  message: string;

  constructor(validationErrors: Record<string, string>) {
    this.name = "ValidationError";
    this.message = JSON.stringify(validationErrors);
  }
}

class MongoDBError implements CustomError {
  name: string;
  message: string;

  constructor(errorMessage: string) {
    this.name = "MongoDBError";
    this.message = errorMessage;
  }
}

export class ErrorHandlerFactory {
  static createError(error: Error): CustomError {
    if (error.name === "ValidationError") {
      return new ValidationError((error as any).errors);
    } else {
      return new MongoDBError(error.message);
    }
  }
}
