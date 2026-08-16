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
         user_rating AS "userRating",
         review,
         watched_at AS "watchedAt",
         created_at,
         updated_at
       FROM watched_movies
       ORDER BY watched_at DESC NULLS LAST, created_at DESC`,
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load watched movies",
    });
  }
});

router.post("/", async (req, res) => {
  const movie = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO watched_movies
       (tmdb_id, title, release_date, poster_path, overview, vote_average, popularity, user_rating, review, watched_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING
         tmdb_id AS id,
         title,
         release_date,
         poster_path,
         overview,
         vote_average,
         popularity,
         user_rating AS "userRating",
         review,
         watched_at AS "watchedAt",
         created_at,
         updated_at`,
      [
        movie.id,
        movie.title,
        movie.release_date,
        movie.poster_path,
        movie.overview,
        movie.vote_average,
        movie.popularity,
        movie.userRating,
        movie.review,
        movie.watchedAt,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Movie is already in watched list",
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Failed to add movie to watched list",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const tmdbId = Number(req.params.id);

  try {
    await pool.query("DELETE FROM watched_movies WHERE tmdb_id = $1", [tmdbId]);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete watched movie",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const tmdbId = Number(req.params.id);
  const updatedFields = req.body;

  try {
    const result = await pool.query(
      `UPDATE watched_movies
       SET
         user_rating = $1,
         review = $2,
         watched_at = $3,
         updated_at = CURRENT_TIMESTAMP
       WHERE tmdb_id = $4
       RETURNING
         tmdb_id AS id,
         title,
         release_date,
         poster_path,
         overview,
         vote_average,
         popularity,
         user_rating AS "userRating",
         review,
         watched_at AS "watchedAt",
         created_at,
         updated_at`,
      [
        updatedFields.userRating,
        updatedFields.review,
        updatedFields.watchedAt,
        tmdbId,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Watched movie not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update watched movie",
    });
  }
});

export default router;
