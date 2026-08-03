import express from "express";

const router = express.Router();

let watchedMovies = [];

router.get("/", (req, res) => {
    res.json(watchedMovies);
});

router.post("/", (req, res) => {
    const movie = req.body;

    const movieAlreadySaved = watchedMovies.some((savedMovie) => {
        return savedMovie.id === movie.id;
    });
    if(movieAlreadySaved){
        return res.status(409).json({ 
            message: "Movie is already in watched list",
        });
    }

    watchedMovies.push(movie);
    res.status(201).json(movie);
});

router.delete("/:id", (req, res) => {
    const movieId = Number(req.params.id);

    watchedMovies = watchedMovies.filter((movie) => {
        return movie.id !== movieId;
    });
    res.status(204).send();
});

router.patch("/:id", (req, res) => {
    const movieId = Number(req.params.id); //convert id to number
    const updatedFields = req.body;

    let updatedMovie = null;

    watchedMovies = watchedMovies.map((movie) => { //find matching movie and update it
        if(movie.id !== movieId){
            return movie;
        }

        updatedMovie = {...movie, ...updatedFields};
        return updatedMovie;
    });
    if(!updatedMovie){
        return res.status(404).json({message: "movie not found"});
    }
    res.json(updatedMovie);
})

export default router;
