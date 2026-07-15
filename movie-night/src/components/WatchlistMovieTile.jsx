function WatchlistMovieTile({
  movie,
  reviewingMovieId,
  movieReview,
  onStartReview,
  onMovieReviewChange,
  onSaveMovieReview,
  onRemoveFromWatchlist,
}) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  return (
    <li className="watchlist-tile">
      {posterUrl ? (
        <img src={posterUrl} alt={`${movie.title} poster`} />
      ) : (
        <div className="poster-placeholder">No poster</div>
      )}

      <h3>{movie.title}</h3>

      <div className="watchlist-tile-actions">
        <button type="button" onClick={() => onStartReview(movie)}>
          Review
        </button>

        <button
          type="button"
          className="danger-button"
          onClick={() => onRemoveFromWatchlist(movie.id)}
        >
          Remove
        </button>
      </div>

      {reviewingMovieId === movie.id && (
        <form
          className="review-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSaveMovieReview(movie);
          }}
        >
          <label>
            Rating
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
    </li>
  );
}

export default WatchlistMovieTile;
