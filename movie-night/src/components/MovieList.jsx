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
          {movies.map((movie) => {
            const isSaved = watchlist.some((savedMovie) => {
              return savedMovie.id === movie.id;
            });

            return (
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
