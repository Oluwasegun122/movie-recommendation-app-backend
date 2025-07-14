import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY; // ✅ safer to assign it once

// Fetch trending movies
export const fetchTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/week";

  const response = await axios.get(url, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });

  return response.data.results;
};

// ✅ Fetch movie details by ID
export const fetchMovieDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}`;

  const response = await axios.get(url, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });

  return response.data;
};

export const searchMovies = async (query) => {
  const url = "https://api.themoviedb.org/3/search/movie";

  const response = await axios.get(url, {
    params: {
      api_key: process.env.TMDB_API_KEY,
      query,
    },
  });

  return response.data.results;
};
