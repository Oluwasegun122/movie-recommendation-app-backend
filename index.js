import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors"; // ✅ Added
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

// ✅ Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);

// Connect DB
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // allow Vite frontend
    credentials: true,
  })
);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
