import express from "express";
import {
  getTrendingMovies,
  getMovieDetails,
  getSearchedMovies,
} from "../controllers/movieController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/:id", getMovieDetails); // ✅ Add this route
router.get("/search", getSearchedMovies);

export default router;
