# 🎬 Movie Recommendation App - Backend

This is the backend server for the **Movie Recommendation App**, built with **Node.js**, **Express.js**, and **MongoDB**. It handles user authentication, movie fetching from TMDB, saving to personal watchlists, rating, commenting, and more.

---

## 📁 Project Structure

server/
├── config/
│ └── db.js # MongoDB connection setup
├── controllers/
│ └── authController.js # Register/Login
│ └── movieController.js # Fetch trending movies
│ └── userController.js # Save/love/rate/comment watchlist movies
├── middleware/
│ └── authMiddleware.js # JWT token verification
├── models/
│ └── User.js # User schema
│ └── Watchlist.js # Watchlist schema
├── routes/
│ └── authRoutes.js # /api/auth
│ └── movieRoutes.js # /api/movies
│ └── userRoutes.js # /api/users
├── services/
│ └── movieService.js # Fetch movies from TMDB
├── .env # Environment variables
├── index.js # Entry point
└── package.json

---

## 🚀 Features

- ✅ User Registration & Login with JWT
- ✅ Protected Routes Middleware
- ✅ Fetch Trending Movies from TMDB API
- ✅ Save Movies to User Watchlist
- ✅ Love a Movie
- ✅ Rate a Movie (1–5)
- ✅ Add Comments to Saved Movies
- ✅ View Saved Movies Only
- ✅ Modular & Scalable Codebase (MVC pattern)

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/oluwasegun122/movie-recommendation-backend.git
cd movie-recommendation-backend

npm install

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
TMDB_API_KEY=your_tmdb_api_key

npm run dev

🛠️ API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user

🎥 Movie Routes
Method	Endpoint	Description
GET	/api/movies/trending	Get trending movies (TMDB)

📚 User/Watchlist Routes (Protected)
Method	Endpoint	Description
GET	/api/users/watchlist	Get user’s watchlist
POST	/api/users/watchlist	Save movie to watchlist
PATCH	/api/users/watchlist/:movieId/love	Mark movie as loved
PATCH	/api/users/watchlist/:movieId/rate	Rate movie (1-5)
POST	/api/users/watchlist/:movieId/comment	Add a comment
DELETE	/api/users/watchlist/:movieId	Remove movie from watchlist

🧪 Testing with Postman
Use JWT from /login response in Authorization Header:

nginx
Copy
Edit
Bearer your_token_here
Example:

json
Copy
Edit
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
🧠 Technologies Used
Node.js

Express.js

MongoDB + Mongoose

JSON Web Tokens (JWT)

bcryptjs (password hashing)

dotenv

axios (for TMDB API)

✨ Future Enhancements
🎬 Movie details page

📈 User dashboard

📌 Genre mapping utility

📱 Frontend (Next.js or React)

👨‍💻 Author
Oluwasegun Oyebamiji
Movie App Backend built as part of full-stack portfolio project.

```
