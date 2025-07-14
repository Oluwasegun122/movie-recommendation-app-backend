import asyncHandler from "express-async-handler";
import {
  fetchTrendingMovies,
  fetchMovieDetails,
} from "../services/movieService.js";
import { mapGenreIdsToNames } from "../utils/genreMapper.js";

// GET /api/movies/trending
export const getTrendingMovies = asyncHandler(async (req, res) => {
  const movies = await fetchTrendingMovies();

  const enhancedMovies = movies.map((movie) => ({
    ...movie,
    genre_names: mapGenreIdsToNames(movie.genre_ids),
  }));

  res.status(200).json(enhancedMovies);
});

// ✅ GET /api/movies/:id
export const getMovieDetails = asyncHandler(async (req, res) => {
  const movie = await fetchMovieDetails(req.params.id);
  res.status(200).json(movie);
});

// @desc    Search movies from TMDB
// @route   GET /api/movies/search?query=superman
// @access  Public
export const getSearchedMovies = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(400);
    throw new Error("Search query is required");
  }

  const movies = await searchMovies(query);

  const enhancedMovies = movies.map((movie) => ({
    ...movie,
    genre_names: mapGenreIdsToNames(movie.genre_ids),
  }));

  res.status(200).json(enhancedMovies);
});
