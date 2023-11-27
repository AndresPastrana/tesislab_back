import { Types } from "mongoose";
interface LoginInput {
  username: string;
  password: string;
}
interface Regsiter {
  role: UserRole.Profesor | UserRole.Student;
  email: string;
}

import { UserRole } from "../const.js";
import { ErrorFactory } from "../errors/error.js";
import { generateSecurePassword } from "../helpers/hash.js";
import { createJWTAsync } from "../helpers/jwt.js";
import { ModelUser } from "../models/User.js";

export default class AuthService {
  static async login({ username, password }: LoginInput): Promise<string> {
    try {
      const user = await ModelUser.findOne({ username });

      if (!user) {
        throw ErrorFactory.createAuthError("Invalid Credentials");
      }

      const isValidPassword = await user.isValidPassword(password);

      if (!isValidPassword) {
        throw ErrorFactory.createAuthError("Invalid Credentials");
      }

      const access_token = (await createJWTAsync({
        uid: user._id.toString(),
        role: user.role,
      })) as string;

      return access_token;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }

    // Here you can generate a token or handle the login response as needed.
    // For simplicity, we're not returning anything for a successful login.
  }

  // Returns the user_id of the created user
  static async register({ role, email }: Regsiter) {
    try {
      const password = generateSecurePassword();

      //TODO: Validate duplicate email
      const username = email.split("@")[0];

      const newUser = await ModelUser.create({
        username,
        password,
        role,
        email,
      });

      return newUser._id as Types.ObjectId;
    } catch (error) {
      throw ErrorFactory.createAuthError("Error creating the new user");
    }
  }

  static async remove({ id }: { id: Types.ObjectId }) {
    try {
      //  TODO: Generate password

      const removed_user = await ModelUser.findByIdAndUpdate(id, {
        isActive: false,
      });

      return removed_user?._id;
    } catch (error) {
      throw ErrorFactory.createAuthError("Error removing the user");
    }
  }
}
