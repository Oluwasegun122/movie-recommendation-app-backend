import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUserService = async ({ username, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const user = await User.create({ username, email, password });

  if (!user) throw new Error("Invalid user data");

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  };
};
