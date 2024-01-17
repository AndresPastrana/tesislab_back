import { Request } from "express";
import { UserRole } from "./src/const.ts";

declare module "express" {
  interface Request {
    user?: {
      userId: string;
      username: string;
      role: UserRole;
      iat: number;
      exp: number;
      uid: string;
    };
  }
}
