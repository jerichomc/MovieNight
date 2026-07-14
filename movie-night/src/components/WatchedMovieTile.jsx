function WatchedMovieTile({
  movie,
  reviewingMovieId,
  movieReview,
  onStartReview,
  onMovieReviewChange,
  onSaveMovieReview,
  onRemoveWatchedMovie,
}) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  return (
    <li className="watched-tile">
      {posterUrl ? (
        <img src={posterUrl} alt={`${movie.title} poster`} />
      ) : (
        <div className="poster-placeholder">No poster</div>
      )}

      
      <p>{movie.userRating ? `${movie.userRating}/10` : "Not rated"}</p>

      <div className="watched-tile-actions">
        <button type="button" onClick={() => onStartReview(movie)}>
          Update
        </button>

        <button
          type="button"
          className="danger-button"
          onClick={() => onRemoveWatchedMovie(movie.id)}
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
              placeholder="Update your review..."
            />
          </label>

          <button type="submit">Save</button>
        </form>
      )}
    </li>
  );
}

export default WatchedMovieTile;