import express from "express";

const router = express.Router();

let watchlist = [];

router.get("/", (req, res) => {
  res.json(watchlist);
}); // Get all movies in the watchlist

router.post("/", (req, res) => { // Add a movie to the watchlist
  const movie = req.body; // Get the movie data from the request body

  const movieAlreadySaved = watchlist.some((savedMovie) => {
    return savedMovie.id === movie.id;
  });

  if (movieAlreadySaved) {
    return res.status(409).json({
      message: "Movie is already in watchlist",
    });
  }

  watchlist.push(movie);

  res.status(201).json(movie); 
});

router.delete("/:id", (req, res) => {
  const movieId = Number(req.params.id);

  watchlist = watchlist.filter((movie) => {
    return movie.id !== movieId;
  });

  res.status(204).send();
});

export default router;