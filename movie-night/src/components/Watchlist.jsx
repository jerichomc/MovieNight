import MovieCard from "./MovieCard.jsx";

function Watchlist({
  watchlist,
  selectedMovie,
  onRemoveFromWatchlist,
  onPickRandomMovie,
  onClearSelectedMovie,
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
      <h2>Watchlist</h2>
      <p>{watchlistMessage}</p>

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
    </section>
  );
}

export default Watchlist;