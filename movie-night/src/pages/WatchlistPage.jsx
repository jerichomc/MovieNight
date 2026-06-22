import Watchlist from "../components/Watchlist.jsx";

function WatchlistPage({
  watchlist,
  selectedMovie,
  onRemoveFromWatchlist,
  onPickRandomMovie,
  onClearSelectedMovie,
}) {
  return (
    <Watchlist
      watchlist={watchlist}
      selectedMovie={selectedMovie}
      onRemoveFromWatchlist={onRemoveFromWatchlist}
      onPickRandomMovie={onPickRandomMovie}
      onClearSelectedMovie={onClearSelectedMovie}
    />
  );
}

export default WatchlistPage;