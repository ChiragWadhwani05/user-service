import { UserProfile } from "../models/userProfile.model.js";

async function createUserProfile(userData) {
  const {
    authUserId,
    username,
    email,
    givenName,
    familyName,
    avatarURL,
    gender,
  } = userData;

  const user = new UserProfile({
    authUserId,
    username,
    email,
    givenName,
    familyName,
    avatarURL,
    gender,
  });

  await user.save();
  const createdUser = await UserProfile.findOne({ authUserId });
  if (!createdUser) {
    throw new Error("Failed to create user profile.");
  }
  console.log("User profile created:", createdUser);
}

export { createUserProfile };
