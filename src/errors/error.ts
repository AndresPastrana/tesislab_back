export interface CustomError {
  error: {
    name: string;
    message: string;
  };
}

class ValidationError implements CustomError {
  error: {
    name: string;
    message: string;
  };

  constructor(validationErrors: Record<string, string>) {
    this.error = {
      name: "ValidationError",
      message: JSON.stringify(validationErrors),
    };
  }
}

class MongoDBError implements CustomError {
  error: {
    name: string;
    message: string;
  };

  constructor(errorMessage: string) {
    this.error = {
      name: "MongoDBError",
      message: errorMessage,
    };
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
