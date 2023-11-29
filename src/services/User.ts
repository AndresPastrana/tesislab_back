import { Schema } from "mongoose";
import { ModelUser } from "../models/User.js";
import { createJWTAsync } from "../helpers/jwt.js";
import { ErrorHandlerFactory } from "../errors/error.js";
import { generateSecurePassword } from "../helpers/hash.js";
import { UserRole } from "../const.js";
import { log } from "console";
interface LoginUserInput {
  username: string;
  password: string;
}

interface UpdateUserInput {
  userId: Schema.Types.ObjectId;
  newEmail: string;
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

interface DeactivateUserInput {
  userId: Schema.Types.ObjectId;
}
interface DeactivateUserResponse {
  user: {
    id: Schema.Types.ObjectId;
    username: string;
    role: string;
    isActive: boolean;
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

      const { stringPassword } = generateSecurePassword();

      const newUser = await this.ModelUser.create({
        username,
        password: stringPassword, // Placeholder for the function
        role,
      });

      return {
        user: {
          id: newUser._id,
          username: newUser.username,
          role: newUser.role,
          password: stringPassword,
        },
      };
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async updateUser({
    userId,
    newEmail,
  }: UpdateUserInput): Promise<RegisterUserResponse> {
    try {
      // Find the user by userId
      const existingUser = await this.ModelUser.findById(userId);

      if (!existingUser) {
        throw ErrorHandlerFactory.createError(new Error("User not found"));
      }

      // Generate a new username based on the new email
      const newUsername = newEmail.split("@")[0];

      // Generate a new secure password
      const { stringPassword } = generateSecurePassword();

      // Update the user with the new email and password
      const updatedUser = await this.ModelUser.findByIdAndUpdate(
        userId,
        {
          email: newEmail,
          username: newUsername,
          password: stringPassword,
        },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw ErrorHandlerFactory.createError(new Error("User update failed"));
      }

      return {
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          role: updatedUser.role,
          password: stringPassword,
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deactivateUser({
    userId,
  }: DeactivateUserInput): Promise<DeactivateUserResponse> {
    try {
      // Find the user by userId
      const existingUser = await this.ModelUser.findById(userId);

      if (!existingUser) {
        throw ErrorHandlerFactory.createError(new Error("User not found"));
      }

      // Update the user to set isActive to false
      const deactivatedUser = await this.ModelUser.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
      );

      if (!deactivatedUser) {
        throw ErrorHandlerFactory.createError(
          new Error("User deactivation failed")
        );
      }

      return {
        user: {
          id: deactivatedUser._id,
          username: deactivatedUser.username,
          role: deactivatedUser.role,
          isActive: deactivatedUser.isActive,
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
