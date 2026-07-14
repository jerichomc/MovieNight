import WatchedMovieTile from "../components/WatchedMovieTile.jsx";

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
          <ul className="watched-grid">
            {watchedMovies.map((movie) => (
              <WatchedMovieTile
                key={movie.id}
                movie={movie}
                reviewingMovieId={reviewingMovieId}
                movieReview={movieReview}
                onStartReview={onStartReview}
                onMovieReviewChange={onMovieReviewChange}
                onSaveMovieReview={onSaveMovieReview}
                onRemoveWatchedMovie={onRemoveWatchedMovie}
              />
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