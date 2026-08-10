import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import watchedRoutes from "./routes/watchedRoutes.js";
import movieNightRoutes from "./routes/movieNightRoutes.js";
import pool from "./db/pool.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/watchlist", watchlistRoutes); //mount the watchlist routes under path
app.use("/api/watched", watchedRoutes); //mount the watched routes under path
app.use("/api/movie-nights", movieNightRoutes); //mount the movie night routes under path

app.get("/api/health", (req, res) => {
    res.json({
        message: "Movie Night API is running",
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});