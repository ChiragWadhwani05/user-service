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

async function updateUsername(userData) {
  const { authUserId, username } = userData;
  const user = await UserProfile.findOne({ authUserId });
  if (!user) {
    throw new Error("User not found.");
  }
  user.username = username;
  await user.save();
  console.log("Username updated:", user);
}

async function updateEmail(userData) {
  const { authUserId, newEmail } = userData;
  const user = await UserProfile.findOne({ authUserId });
  if (!user) {
    throw new Error("User not found.");
  }
  user.email = newEmail;
  await user.save();
  console.log("Email updated:", user);
}

export { createUserProfile, updateUsername, updateEmail };
