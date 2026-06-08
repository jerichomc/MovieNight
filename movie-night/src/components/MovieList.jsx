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
            <li key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <p>{movie.overview}</p>

              <button type="button" onClick={() => onAddToWatchlist(movie)}>
                Add to Watchlist
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </section>
  );
}

export default MovieList;