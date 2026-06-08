function Watchlist({
  watchlist,
  selectedMovie,
  onRemoveFromWatchlist,
  onPickRandomMovie,
}) {
  return (
    <section className="watchlist-section">
      <h2>Watchlist</h2>
      <p>{watchlist.length} saved movies</p>

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
            <li key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>

              <button
                type="button"
                onClick={() => onRemoveFromWatchlist(movie.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your watchlist is empty.</p>
      )}

      {selectedMovie && ( // Conditionally render the selected movie if it exists
        <div className="selected-movie">
          <h3>Tonight's pick</h3>
          <p>{selectedMovie.title}</p> 
        </div>
      )}
    </section>
  );
}

export default Watchlist;