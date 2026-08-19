import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
     tmdb_id AS id,
     title,
     release_date,
     poster_path,
     overview,
     vote_average,
     popularity,
     created_at
   FROM saved_movies
   ORDER BY created_at DESC`,
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load watchlist",
    });
  }
});

router.post("/", async (req, res) => {
  const movie = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO saved_movies
       (tmdb_id, title, release_date, poster_path, overview, vote_average, popularity)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING
        tmdb_id AS id,
        title,
        release_date,
        poster_path,
        overview,
        vote_average,
        popularity,
        created_at
      `,
      [
        movie.id,
        movie.title,
        movie.release_date,
        movie.poster_path,
        movie.overview,
        movie.vote_average,
        movie.popularity,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Movie is already in watchlist",
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Failed to add movie to watchlist",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const tmdbId = Number(req.params.id);

  try {
    await pool.query("DELETE FROM saved_movies WHERE tmdb_id = $1", [tmdbId]);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete movie from watchlist",
    });
  }
});

export default router;
