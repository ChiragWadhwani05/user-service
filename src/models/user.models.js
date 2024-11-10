import { Schema, model } from "mongoose";
import {
  AvailableUserRoles,
  UserRoleEnum,
  AvailableUserLogins,
  AccountStatusEnum,
  AvailableAccountStatus,
  AvailableUserGenders,
} from "../constants.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    givenName: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    gender: {
      type: String,
      enum: AvailableUserGenders,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRoleEnum.USER,
      required: true,
    },
    accountStatus: {
      type: String,
      enum: AvailableAccountStatus,
      default: AccountStatusEnum.ACTIVE,
      required: true,
    },
    loginType: {
      type: [String],
      enum: AvailableUserLogins,
      required: true,
    },
    googleId: {
      type: String,
    },
    refreshToken: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export { User };
