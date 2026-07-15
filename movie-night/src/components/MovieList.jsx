import MovieCard from "./MovieCard.jsx";

function MovieList({
  submittedSearch,
  movies,
  watchlist,
  sortBy,
  setSortBy,
  currentPage,
  totalPages,
  handleChangePage,
  handlePageSelect,
  onAddToWatchlist,
  onStartReview,
  watchedMovies,
}) {
  if (!submittedSearch) {
    return null;
  }

  let resultMessage = "";

  if (movies.length === 1) {
    resultMessage = "1 movie found.";
  } else if (movies.length > 1) {
    resultMessage = `${movies.length} movies found.`;
  }

  const pageOptions = Array.from(
    { length: Math.min(totalPages, 10) },
    (_, index) => index + 1,
  );

  return (
    <section className="results-section">
      <h2>Search Results for "{submittedSearch}"</h2>

      <div className="results-toolbar">
        <label htmlFor="sort-movies">Sort by</label>

        <select
          id="sort-movies"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="title">Title</option>
        </select>
      </div>

      {resultMessage && <p className="result-message">{resultMessage}</p>}

      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => {
            const isSaved = watchlist.some((savedMovie) => {
              return savedMovie.id === movie.id;
            });

            const isWatched = watchedMovies.some((watchedMovie) => {
              return watchedMovie.id === movie.id;
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

                <button type="button" onClick={() => onStartReview(movie)}>
                  {isWatched ? "Update Review" : "Review"}
                </button>
              </MovieCard>
            );
          })}
        </ul>
      ) : (
        <p>No movies found for "{submittedSearch}".</p>
      )}

      {movies.length > 0 && (
        <div className="pagination-controls">
          <button
            type="button"
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

          <select
            id="pageSelect"
            value={currentPage}
            onChange={(event) => handlePageSelect(Number(event.target.value))}
          >
            {pageOptions.map((pageNumber) => (
              <option key={pageNumber} value={pageNumber}>
                Page {pageNumber}
              </option>
            ))}
          </select>
        </div>
      )}
    </section>
  );
}

export default MovieList;
