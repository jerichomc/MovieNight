# Movie Night

Movie Night is a full-stack application for discovering movies, maintaining a personal watchlist, reviewing watched films, and planning movie nights.

## Features

- Search movies using the TMDB API
- Sort and paginate search results
- Save and remove movies from a personal watchlist
- Randomly select a movie from the watchlist
- Rate and review watched films
- Update and delete reviews
- Create, edit, and delete movie nights
- Add watchlist movies as movie-night options
- Register and log in
- Keep watchlists, reviews, and movie nights tied to individual users

## Tech Stack

### Frontend

- React
- Vite
- React Router
- TMDB API
- CSS

### Backend

- Node.js
- Express
- PostgreSQL
- JSON Web Tokens
- bcrypt

## Project Structure

```text
MovieNight/
|-- backend/
|   |-- db/
|   |   |-- pool.js
|   |   `-- schema.sql
|   |-- middleware/
|   |-- routes/
|   |-- package.json
|   `-- server.js
|-- movie-night/
|   |-- public/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   `-- pages/
|   `-- package.json
`-- README.md
```

## Setup Instructions

### Requirements

Install or obtain the following before starting:

- Node.js
- npm
- PostgreSQL
- pgAdmin or another PostgreSQL client
- A TMDB API key

### 1. Clone The Repository

```bash
git clone <repository-url>
cd MovieNight
```

Replace `<repository-url>` with the repository's Git URL.

### 2. Create The PostgreSQL Database

Create a PostgreSQL database named:

```text
movie_night
```

Using pgAdmin:

1. Connect to your local PostgreSQL server.
2. Right-click **Databases**.
3. Select **Create > Database**.
4. Enter `movie_night` as the database name.
5. Save the database.
6. Open the Query Tool for `movie_night`.
7. Open `backend/db/schema.sql`.
8. Execute the script.

The script creates the following tables:

- `users`
- `saved_movies`
- `watched_movies`
- `movie_nights`
- `movie_night_movies`

### 3. Configure The Backend

Create a file named `.env` inside the `backend` directory:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/movie_night
JWT_SECRET=replace_with_a_long_random_secret
```

Replace `YOUR_PASSWORD` with your local PostgreSQL password.

Replace the JWT secret with a long, private, random value. Do not commit the `.env` file.

### 4. Install And Start The Backend

From the repository root:

```bash
cd backend
npm install
npm run dev
```

The backend API runs at:

```text
http://localhost:5000
```

You can test it at:

```text
http://localhost:5000/api/health
```

### 5. Configure The Frontend

Create a file named `.env` inside the `movie-night` directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your TMDB API key. Do not commit the `.env` file.

### 6. Install And Start The Frontend

Open a second terminal from the repository root:

```bash
cd movie-night
npm install
npm run dev
```

Open the local URL displayed by Vite. It is typically:

```text
http://localhost:5173
```

Both the backend and frontend development servers must be running while using the app.

## Authentication

Passwords are hashed with bcrypt before being stored.

After successful registration or login, the backend creates a JSON Web Token. The frontend sends that token in the `Authorization` header when requesting protected data.

Protected routes use the verified user ID to keep watchlists, reviews, and movie nights tied to the correct account.

## Database Relationships

```text
users
|-- saved_movies
|-- watched_movies
`-- movie_nights
    `-- movie_night_movies
```

Foreign keys connect user-owned records to their owners. Cascading deletes remove dependent records when their parent user or movie night is deleted.

## Available Scripts

### Frontend

Run these commands inside `movie-night`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

Run these commands inside `backend`:

```bash
npm run dev
npm start
```

## Current Status

The core full-stack functionality works locally. Planned features include:

- Public user profiles
- Social reviews
- Shared movie nights
- Movie voting
- Two-person swipe-to-match movie selection
- Automated tests
- Production deployment

## API Attribution

Movie information is provided by [The Movie Database](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.