function WatchlistMovieTile({
  movie,
  onStartReview,
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

    </li>
  );
}

export default WatchlistMovieTile;
