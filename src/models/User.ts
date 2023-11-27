import { HydratedDocument, model, Schema, Document } from "mongoose";
import { compareHash } from "../helpers/index.js";
import { UserRole } from "../const.js";
type IsValidPasswordFunction = (password: string) => boolean;
interface UserType {
  isActive: Boolean;
  email: string;
  role: UserRole;
  username: string;
  password: string;
  isValidPassword: IsValidPasswordFunction;
}

interface User extends UserType, Document {}

const UserSchema = new Schema<User>(
  {
    isActive: { type: Boolean, require: false, default: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    password: { type: String, required: true },
    username: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, trim: true },
  },
  {
    methods: {
      toJSON: function (this: HydratedDocument<User>) {
        const { __v, _id, password, ...rest } = this.toObject();
        return { id: _id, ...rest };
      },
      isValidPassword: async function (password: string) {
        const user = this.toObject();
        const isSame = await compareHash(password, user.password);
        return isSame;
      },
    },
  }
);

export const ModelUser = model("User", UserSchema);
