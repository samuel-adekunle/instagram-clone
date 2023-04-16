import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
    default: "Hi there!",
  },
  link: {
    type: String,
    required: true,
    default: "https://example.com",
  },
  profileImage: {
    type: String,
    required: false,
  },
  coverImage: {
    type: String,
    required: true,
    default: "",
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  following: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
  followingCount: {
    type: Number,
    required: true,
    default: 0,
  },
  followers: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
  followersCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

function sanitizeUserName(username) {
  return username.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export async function getMongodbUser(User, auth0User) {
  let user = await User.findOne({ email: auth0User.email });
  if (!user) {
    const username = sanitizeUserName(auth0User.email);
    user = await User.create({
      email: auth0User.email,
      username,
      name: username,
    });
  }
  return user;
}

export default mongoose.models.User || mongoose.model("User", UserSchema);