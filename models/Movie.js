import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    tmdbId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    overview: String,
    posterPath: String,
    releaseDate: String,
    genres: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
