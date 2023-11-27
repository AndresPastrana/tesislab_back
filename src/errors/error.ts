class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppError";
  }
}

class AuthError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

class DatabaseError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

class ErrorFactory {
  static createAuthError(message: string): AuthError {
    return new AuthError(message);
  }

  static createDatabaseError(message: string): DatabaseError {
    return new DatabaseError(message);
  }
}

export { AppError, AuthError, DatabaseError, ErrorFactory };
