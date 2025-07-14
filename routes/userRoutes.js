import express from "express";
import {
  saveMovie,
  loveMovie,
  removeMovie,
  getWatchlist,
  getLovedMovies,
  getProfile,
  updateProfile,
  rateMovie,
  addComment,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/watchlist", protect, saveMovie);
router.patch("/watchlist/:movieId/love", protect, loveMovie);
router.delete("/watchlist/:movieId", protect, removeMovie);
router.patch("/watchlist/:movieId/rate", protect, rateMovie);
router.post("/watchlist/:movieId/comment", protect, addComment);

router.get("/watchlist", protect, getWatchlist);
router.get("/watchlist/loved", protect, getLovedMovies);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile); // ✅ add PUT

export default router;
