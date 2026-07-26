import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import watchlistRoutes from "./routes/watchlistRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/watchlist", watchlistRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        message: "Movie Night API is running",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});