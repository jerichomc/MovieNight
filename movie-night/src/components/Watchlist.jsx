import MovieCard from "./MovieCard.jsx";

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
        <ul>
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie}>
              <button type="button" onClick={() => onStartReview(movie)}>
                Review
              </button>

              {reviewingMovieId === movie.id && (
                <form
                  className="review-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSaveMovieReview(movie);
                  }}
                >
                  <label>
                    Rating out of 10
                    <input
                      type="number"
                      name="rating"
                      min="0"
                      max="10"
                      step="1"
                      value={movieReview.rating}
                      onChange={onMovieReviewChange}
                    />
                  </label>

                  <label>
                    Review
                    <textarea
                      name="review"
                      value={movieReview.review}
                      onChange={onMovieReviewChange}
                      placeholder="What did you think?"
                    />
                  </label>

                  <button type="submit">Save Review</button>
                </form>
              )}

              <button
                className="remove-button"
                type="button"
                onClick={() => onRemoveFromWatchlist(movie.id)}
              >
                Remove
              </button>
            </MovieCard>
          ))}
        </ul>
      ) : (
        <p>{watchlistMessage}</p>
      )}
    </section>
  );
}

export default Watchlist;
