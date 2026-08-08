import express from "express";

const router = express.Router();

let movieNights = [];

router.get("/", (req, res) => {
    res.json(movieNights); //save the movie nights in the array and return them as JSON
})

router.post("/", (req, res) => {
  const movieNight = req.body;

  const newMovieNight = {
    id: crypto.randomUUID(),
    title: movieNight.title,
    date: movieNight.date,
    location: movieNight.location,
    notes: movieNight.notes,
    movies: movieNight.movies || [],
    guests: movieNight.guests || [],
    snacks: movieNight.snacks || [],
  };

  movieNights.push(newMovieNight);

  res.status(201).json(newMovieNight);
});

router.patch("/:id", (req, res) => {
  const movieNightId = req.params.id;
  const updatedFields = req.body;

  let updatedMovieNight = null;

  movieNights = movieNights.map((night) => {
    if (night.id !== movieNightId) {
      return night;
    }

    updatedMovieNight = {
      ...night,
      ...updatedFields,
    };

    return updatedMovieNight;
  });

  if (!updatedMovieNight) {
    return res.status(404).json({
      message: "Movie night not found",
    });
  }

  res.json(updatedMovieNight);
});

router.delete("/:id", (req, res) => {
  const movieNightId = req.params.id;

  movieNights = movieNights.filter((night) => {
    return night.id !== movieNightId;
  });

  res.status(204).send();
});

export default router;