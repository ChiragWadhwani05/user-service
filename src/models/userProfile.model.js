import { Schema, model } from "mongoose";
import { AvailableUserGenders } from "../constants.js";

const userProfileSchema = new Schema(
  {
    authUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
      ref: "Auth_User",
    },
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
  },
  {
    timestamps: true,
  }
);

const UserProfile = model("User_Profile", userProfileSchema);

export { UserProfile };
