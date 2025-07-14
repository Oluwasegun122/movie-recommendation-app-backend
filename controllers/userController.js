import asyncHandler from "express-async-handler";
import Watchlist from "../models/Watchlist.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc    Save a movie to the user's watchlist
// @route   POST /api/users/watchlist
// @access  Private
export const saveMovie = asyncHandler(async (req, res) => {
  const { movieId, title, poster_path } = req.body;

  if (!movieId || !title || !poster_path) {
    res.status(400);
    throw new Error("Missing movie data");
  }

  // Avoid duplicate entries
  const alreadySaved = await Watchlist.findOne({ user: req.user._id, movieId });
  if (alreadySaved) {
    res.status(400);
    throw new Error("Movie already saved");
  }

  const movie = await Watchlist.create({
    user: req.user._id,
    movieId,
    title,
    poster_path,
    loved: false,
  });

  res.status(201).json(movie);
});

// @desc    Mark a movie as loved
// @route   PATCH /api/users/watchlist/:movieId/love
// @access  Private
export const loveMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params;

  const movie = await Watchlist.findOne({ user: req.user._id, movieId });

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found in your watchlist");
  }

  movie.loved = true;
  await movie.save();

  res.status(200).json({ message: "Movie marked as loved", movie });
});

// @desc    Remove a movie from the user's watchlist
// @route   DELETE /api/users/watchlist/:movieId
// @access  Private
export const removeMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params;

  const movie = await Watchlist.findOneAndDelete({
    user: req.user._id,
    movieId,
  });

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found in your watchlist");
  }

  res.status(200).json({ message: "Movie removed from watchlist" });
});

export const getWatchlist = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";

  const searchQuery = {
    user: req.user._id,
    title: { $regex: search, $options: "i" }, // case-insensitive title match
  };

  const total = await Watchlist.countDocuments(searchQuery);
  const watchlist = await Watchlist.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    itemsPerPage: limit,
    watchlist,
  });
});

// @desc    Get all loved movies from user's watchlist
// @route   GET /api/users/watchlist/loved
// @access  Private
export const getLovedMovies = asyncHandler(async (req, res) => {
  const lovedMovies = await Watchlist.find({
    user: req.user._id,
    loved: true,
  });

  res.status(200).json(lovedMovies);
});

// @desc    Get current user's profile info
// @route   GET /api/users/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

// @desc    Update current user's profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update fields if provided
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
  });
});

// @desc    Rate a movie
// @route   PATCH /api/users/watchlist/:movieId/rate
// @access  Private
export const rateMovie = asyncHandler(async (req, res) => {
  const { rating } = req.body;
  const { movieId } = req.params;

  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error("Rating must be between 1 and 5");
  }

  const movie = await Watchlist.findOne({ user: req.user._id, movieId });

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found in your watchlist");
  }

  movie.rating = rating;
  await movie.save();

  res.status(200).json({ message: "Movie rated successfully", movie });
});

// @desc    Add a comment to a movie
// @route   POST /api/users/watchlist/:movieId/comment
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { movieId } = req.params;

  if (!text) {
    res.status(400);
    throw new Error("Comment text is required");
  }

  const movie = await Watchlist.findOne({ user: req.user._id, movieId });

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found in your watchlist");
  }

  movie.comments.push({ text });
  await movie.save();

  res.status(200).json({ message: "Comment added", movie });
});
