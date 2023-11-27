import { model, Schema, Document } from "mongoose";
import { compareHash } from "../helpers/index.js";
import { UserRole } from "../const.js";

type IsValidPasswordFunction = (password: string) => Promise<boolean>;

interface UserType {
  isActive: boolean;
  role: UserRole;
  username: string;
  password: string;
  isValidPassword: IsValidPasswordFunction;
}

interface UserDocument extends UserType, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    isActive: { type: Boolean, required: false, default: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should be at least 6 characters"],
      maxlength: [50, "Password should not exceed 50 characters"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Username should be at least 3 characters"],
      maxlength: [50, "Username should not exceed 50 characters"],
      match: /^[a-zA-Z0-9]+$/, // Alphanumeric characters only
    },
  },
  {
    toJSON: {
      transform: function (_doc: any, ret: any) {
        const { __v, _id, password, ...rest } = ret;
        return { id: _id, ...rest };
      },
    },
    methods: {
      isValidPassword: async function (password: string) {
        const user = this.toObject();
        const isSame = await compareHash(password, user.password);
        return isSame;
      },
    },
  }
);

export const ModelUser = model<UserDocument>("User", UserSchema);
