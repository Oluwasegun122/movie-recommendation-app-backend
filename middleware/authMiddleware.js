import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next(); // ✅ Exit early if successful
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // 🛑 Only run this if no token in the header at all
  res.status(401);
  throw new Error("Not authorized, no token");
});

export default protect;
