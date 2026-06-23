import Watchlist from "../components/Watchlist.jsx";

function WatchlistPage({
  watchlist,
  selectedMovie,
  onRemoveFromWatchlist,
  onPickRandomMovie,
  onClearSelectedMovie,
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
    />

    </>
  );
}

export default WatchlistPage;