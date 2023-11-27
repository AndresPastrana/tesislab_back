import { Schema } from "mongoose";
import { ModelUser } from "../models/User.js";
import { createJWTAsync } from "../helpers/jwt.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { generateSecurePassword } from "../helpers/hash.js";
import { UserRole } from "../const.js";
interface LoginUserInput {
  username: string;
  password: string;
}

interface LoginUserResponse {
  user: {
    id: string;
    username: string;
    role: string;
  };
  token: string;
}

interface RegisterUserInput {
  role: UserRole;
  email: string;
}

interface RegisterUserResponse {
  user: {
    id: Schema.Types.ObjectId;
    username: string;
    password: string;
    role: UserRole;
  };
}

export class UserService {
  private static ModelUser = ModelUser;

  static async loginUser({
    username,
    password,
  }: LoginUserInput): Promise<LoginUserResponse> {
    try {
      const user = await this.ModelUser.findOne({ username });

      if (!user) {
        throw ErrorHandlerFactory.createError(
          new Error("Invalid username or password")
        );
      }

      const isValidPassword = await user.isValidPassword(password);

      if (!isValidPassword) {
        throw ErrorHandlerFactory.createError(
          new Error("Invalid username or password")
        );
      }

      const token = await createJWTAsync({
        userId: user._id,
        username: user.username,
        role: user.role,
      });

      return {
        user: {
          id: user._id.toString(),
          username: user.username,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  static async registerUser({
    role,
    email,
  }: RegisterUserInput): Promise<RegisterUserResponse> {
    try {
      const username = email.split("@")[0];
      const existingUser = await this.ModelUser.findOne({ username });

      if (existingUser) {
        throw ErrorHandlerFactory.createError(
          new Error("Username is already taken")
        );
      }

      const password = generateSecurePassword();

      const newUser = await this.ModelUser.create({
        username,
        password, // Placeholder for the function
        role,
      });

      return {
        user: {
          id: newUser._id,
          username: newUser.username,
          role: newUser.role,
          password,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
