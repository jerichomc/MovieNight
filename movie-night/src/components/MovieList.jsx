import MovieCard from "./MovieCard.jsx";

function MovieList({ submittedSearch, movies, watchlist, onAddToWatchlist }) {
  if (!submittedSearch) {
    return null; // Don't render anything if no search has been submitted
  }

  return (
    <section className="results-section">
      <h2>Search Results for "{submittedSearch}"</h2>

      {movies.length > 0 ? ( // Check if there are movies to display
        <ul>
          {movies.map((movie) => { // Iterate over the list of movies and render a MovieCard for each one
            const isSaved = watchlist.some((savedMovie) => {
              return savedMovie.id === movie.id;
            });

            return ( // Render a MovieCard for each movie, passing the movie data and a button to add to the watchlist
              <MovieCard key={movie.id} movie={movie}>
                <button
                className="add-to-watchlist-button"
                  type="button"
                  onClick={() => onAddToWatchlist(movie)}
                  disabled={isSaved}
                >
                  {isSaved ? "Saved" : "Add to Watchlist"}
                </button>
              </MovieCard>
            );
          })}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </section>
  );
}

export default MovieList;
