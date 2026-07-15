import MovieCard from "./MovieCard.jsx";
import WatchlistMovieTile from "./WatchlistMovieTile.jsx";

function Watchlist({
  watchlist,
  selectedMovie,
  onRemoveFromWatchlist,
  onPickRandomMovie,
  onClearSelectedMovie,
  reviewingMovieId,
  movieReview,
  onStartReview,
  onMovieReviewChange,
  onSaveMovieReview,
}) {
  let watchlistMessage = "";
  if (watchlist.length <= 0) {
    watchlistMessage = "Your watchlist is empty.";
  } else if (watchlist.length === 1) {
    watchlistMessage = "1 saved movie, add more for a better random selection!";
  } else {
    watchlistMessage = `${watchlist.length} saved movies, ready to watch?`;
  }

  return (
    <section className="watchlist-section">
      <p>{watchlistMessage}</p>
      {selectedMovie && ( // Conditionally render the selected movie if it exists
        <div className="selected-movie">
          <h3>Tonight's pick</h3>
          <MovieCard movie={selectedMovie}>
            <button type="button" onClick={onClearSelectedMovie}>
              Clear
            </button>
          </MovieCard>
        </div>
      )}

      <button
        type="button"
        onClick={onPickRandomMovie}
        disabled={watchlist.length === 0}
      >
        Pick Random Movie
      </button>

      {watchlist.length > 0 ? (
        <ul className="watchlist-grid">
          {watchlist.map((movie) => (
            <WatchlistMovieTile
              key={movie.id}
              movie={movie}
              reviewingMovieId={reviewingMovieId}
              movieReview={movieReview}
              onStartReview={onStartReview}
              onMovieReviewChange={onMovieReviewChange}
              onSaveMovieReview={onSaveMovieReview}
              onRemoveFromWatchlist={onRemoveFromWatchlist}
            />
          ))}
        </ul>
      ) : (
        <p>{watchlistMessage}</p>
      )}
    </section>
  );
}

export default Watchlist;
