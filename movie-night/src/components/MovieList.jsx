import MovieCard from "./MovieCard.jsx";

function MovieList({ submittedSearch, movies, onAddToWatchlist }) {
  if (!submittedSearch) {
    return null; // Don't render anything if no search has been submitted
  }

  return (
    <section className="results-section">
      <h2>Search Results for "{submittedSearch}"</h2>

      {movies.length > 0 ? ( // Check if there are movies to display
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}>
                <button type="button" onClick={() => onAddToWatchlist(movie)}>
                  Add to Watchlist
                </button>
            </MovieCard>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </section>
  );
}

export default MovieList;