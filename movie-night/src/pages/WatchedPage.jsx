import MovieCard from "../components/MovieCard.jsx";

function WatchedPage({
  watchedMovies,
  onRemoveWatchedMovie,
  reviewingMovieId,
  movieReview,
  onStartReview,
  onMovieReviewChange,
  onSaveMovieReview,
}) {
  return (
    <>
      <header className="page-header">
        <h1>Watched Movies</h1>
        <p>Track movies you have seen and rated.</p>
      </header>

      <section className="watched-section">
        {watchedMovies.length > 0 ? (
          <ul>
            {watchedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}>
                <p>
                  Your rating: <b>{movie.userRating || "Not rated yet"}</b>
                </p>

                <button type="button" onClick={() => onStartReview(movie)}>
                  Update Review
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
                        placeholder="Update your review..."
                      />
                    </label>

                    <button type="submit">Save Review</button>
                  </form>
                )}

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => onRemoveWatchedMovie(movie.id)}
                >
                  Remove
                </button>
              </MovieCard>
            ))}
          </ul>
        ) : (
          <p>No watched movies yet.</p>
        )}
      </section>
    </>
  );
}

export default WatchedPage;
