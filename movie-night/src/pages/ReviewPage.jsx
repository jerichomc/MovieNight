import { Link } from "react-router-dom";

function ReviewPage({
  movie,
  movieReview,
  onMovieReviewChange,
  onSaveReview,
  onCancelReview,
}) {
  if (!movie) {
    return (
      <>
        <header className="page-header">
          <h1>Review Movie</h1>
          <p>No movie is currently selected for review.</p>
        </header>

        <Link to="/">Back to search</Link>
      </>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  return (
    <>
      <header className="page-header">
        <h1>Review Movie</h1>
        <p>Log your rating and thoughts without breaking the movie grid.</p>
      </header>

      <section className="review-page">
        <div className="review-page-movie">
          {posterUrl ? (
            <img src={posterUrl} alt={`${movie.title} poster`} />
          ) : (
            <div className="poster-placeholder">No poster</div>
          )}

          <div>
            <h2>{movie.title}</h2>
            {movie.release_date && <p>{movie.release_date.slice(0, 4)}</p>}
            {movie.overview && <p>{movie.overview}</p>}
          </div>
        </div>

        <form
          className="review-page-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSaveReview();
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

          <div className="review-page-actions">
            <button type="submit">Save Review</button>
            <button type="button" onClick={onCancelReview}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ReviewPage;
