-- Movie Night Database Schema

BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_movies (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tmdb_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  release_date TEXT,
  poster_path TEXT,
  overview TEXT,
  vote_average NUMERIC,
  popularity NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, tmdb_id)
);

CREATE TABLE IF NOT EXISTS watched_movies (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tmdb_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  release_date TEXT,
  poster_path TEXT,
  overview TEXT,
  vote_average NUMERIC,
  popularity NUMERIC,
  user_rating NUMERIC,
  review TEXT,
  watched_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, tmdb_id)
);

CREATE TABLE IF NOT EXISTS movie_nights (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movie_night_movies (
  id SERIAL PRIMARY KEY,
  movie_night_id INTEGER NOT NULL
    REFERENCES movie_nights(id)
    ON DELETE CASCADE,
  tmdb_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  release_date TEXT,
  poster_path TEXT,
  overview TEXT,
  vote_average NUMERIC,
  popularity NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (movie_night_id, tmdb_id)
);

COMMIT;