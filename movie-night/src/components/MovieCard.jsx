function MovieCard({movie, children}) { // The MovieCard component takes in a movie object and children as props
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : null; // Construct the poster URL using the movie's poster_path, or set it to null if poster_path is not available

    const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "NA"; // Extract the release year from the movie's release_date, or set it to "N/A" if release_date is not available

    const hasTmdbRating = movie.vote_average !== null && movie.vote_average !== undefined;
    const rating = hasTmdbRating ? movie.vote_average.toFixed(1) : "Not Rated";

    function getRatingEmoji(rating) {
        if (rating >= 7) {
            return "🧨"; // Return a dynamite emoji for highly rated movies
        }
        if (rating >= 5) {
            return "😐"; // Return a meh emoji for moderately rated movies
        }
        return "🤢"
    }

    const ratingEmoji = hasTmdbRating ? getRatingEmoji(movie.vote_average) : ""; // Get the appropriate emoji based on the movie's rating, or set it to an empty string if vote_average is not available

    return (
        <li className="movie-card">
            {posterUrl ? (
                <img src={posterUrl} alt={`${movie.title} poster`} />
            ) : (
                <div className="no-poster">No Poster Available</div>
            )}

            <div className="movie-card-content">
                <h3>{movie.title}</h3>
                <p>{releaseYear}</p>
                <p>Rating: {rating} {ratingEmoji}</p>

                {movie.overview && <p>{movie.overview}</p>} {/* Conditionally render the movie overview if it exists */}

                {movie.userRating && (
                    <div className="user-review">
                        {movie.review && <p>{movie.review}</p>}
                    </div>
                )}

                {children} {/* Render any children passed to the MovieCard component, such as buttons to add to watchlist or remove from watchlist */}
            </div>
        </li>
    );
}

export default MovieCard;
