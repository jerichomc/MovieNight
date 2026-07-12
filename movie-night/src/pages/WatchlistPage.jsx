import Watchlist from "../components/Watchlist.jsx";

function WatchlistPage({
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
  return (
    <>
      <header className="page-header">
        <h1>Watchlist</h1>
      </header>
      <Watchlist
        watchlist={watchlist}
        selectedMovie={selectedMovie}
        onRemoveFromWatchlist={onRemoveFromWatchlist}
        onPickRandomMovie={onPickRandomMovie}
        onClearSelectedMovie={onClearSelectedMovie}
        reviewingMovieId={reviewingMovieId}
        movieReview={movieReview}
        onStartReview={onStartReview}
        onMovieReviewChange={onMovieReviewChange}
        onSaveMovieReview={onSaveMovieReview}
      />
    </>
  );
}

export default WatchlistPage;
