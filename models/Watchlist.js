import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // don't create an _id for each comment object
);

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    title: String,
    overview: String,
    poster_path: String,
    backdrop_path: String,
    release_date: String,
    genre_ids: [Number],
    loved: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
export default Watchlist;
