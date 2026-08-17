import express from "express";
import pool from "../db/pool.js";

const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const nightsResult = await pool.query(
      `SELECT
         id,
         title,
         date,
         location,
         notes,
         created_at,
         updated_at
       FROM movie_nights
       ORDER BY created_at DESC`,
    );

    const moviesResult = await pool.query(
      `SELECT
         movie_night_id,
         tmdb_id AS id,
         title,
         release_date,
         poster_path,
         overview,
         vote_average,
         popularity,
         created_at
       FROM movie_night_movies
       ORDER BY created_at DESC`,
    );

    const movieNights = nightsResult.rows.map((night) => {
      const movies = moviesResult.rows.filter((movie) => {
        return movie.movie_night_id === night.id;
      });

      return {
        ...night,
        movies,
      };
    });

    res.json(movieNights);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load movie nights",
    });
  }
});

router.post("/", async (req, res) => {
  const movieNight = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO movie_nights
       (title, date, location, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING
         id,
         title,
         date,
         location,
         notes,
         created_at,
         updated_at`,
      [
        movieNight.title,
        movieNight.date || null,
        movieNight.location,
        movieNight.notes,
      ],
    );

    const newMovieNight = {
      ...result.rows[0],
      movies: [],
    };

    res.status(201).json(newMovieNight);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create movie night",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const movieNightId = Number(req.params.id);
  const updatedFields = req.body;

  try {
    const result = await pool.query(
      `UPDATE movie_nights
       SET
         title = $1,
         date = $2,
         location = $3,
         notes = $4,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING
         id,
         title,
         date,
         location,
         notes,
         created_at,
         updated_at`,
      [
        updatedFields.title,
        updatedFields.date || null,
        updatedFields.location,
        updatedFields.notes,
        movieNightId,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Movie night not found",
      });
    }

    const moviesResult = await pool.query(
      `SELECT
         tmdb_id AS id,
         title,
         release_date,
         poster_path,
         overview,
         vote_average,
         popularity,
         created_at
       FROM movie_night_movies
       WHERE movie_night_id = $1
       ORDER BY created_at DESC`,
      [movieNightId],
    );

    res.json({
      ...result.rows[0],
      movies: moviesResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update movie night",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const movieNightId = Number(req.params.id);

  try {
    await pool.query("DELETE FROM movie_nights WHERE id = $1", [movieNightId]);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete movie night",
    });
  }
});

router.post("/:id/movies", async (req, res) => {
  const movieNightId = Number(req.params.id);
  const movie = req.body;

  try {
    await pool.query(
      `INSERT INTO movie_night_movies
       (movie_night_id, tmdb_id, title, release_date, poster_path, overview, vote_average, popularity)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (movie_night_id, tmdb_id) DO NOTHING`,
      [
        movieNightId,
        movie.id,
        movie.title,
        movie.release_date,
        movie.poster_path,
        movie.overview,
        movie.vote_average,
        movie.popularity,
      ],
    );

    const nightResult = await pool.query(
      `SELECT
         id,
         title,
         date,
         location,
         notes,
         created_at,
         updated_at
       FROM movie_nights
       WHERE id = $1`,
      [movieNightId],
    );

    if (nightResult.rows.length === 0) {
      return res.status(404).json({
        message: "Movie night not found",
      });
    }

    const moviesResult = await pool.query(
      `SELECT
         tmdb_id AS id,
         title,
         release_date,
         poster_path,
         overview,
         vote_average,
         popularity,
         created_at
       FROM movie_night_movies
       WHERE movie_night_id = $1
       ORDER BY created_at DESC`,
      [movieNightId],
    );

    res.status(201).json({
      ...nightResult.rows[0],
      movies: moviesResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add movie to movie night",
    });
  }
});

router.delete("/:id/movies/:movieId", async (req, res) => {
  const movieNightId = Number(req.params.id);
  const movieId = Number(req.params.movieId);

  try {
    await pool.query(
      `DELETE FROM movie_night_movies
       WHERE movie_night_id = $1 AND tmdb_id = $2`,
      [movieNightId, movieId],
    );

    const nightResult = await pool.query(
      `SELECT
         id,
         title,
         date,
         location,
         notes,
         created_at,
         updated_at
       FROM movie_nights
       WHERE id = $1`,
      [movieNightId],
    );

    if (nightResult.rows.length === 0) {
      return res.status(404).json({
        message: "Movie night not found",
      });
    }

    const moviesResult = await pool.query(
      `SELECT
         tmdb_id AS id,
         title,
         release_date,
         poster_path,
         overview,
         vote_average,
         popularity,
         created_at
       FROM movie_night_movies
       WHERE movie_night_id = $1
       ORDER BY created_at DESC`,
      [movieNightId],
    );

    res.json({
      ...nightResult.rows[0],
      movies: moviesResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove movie from movie night",
    });
  }
});

export default router;
