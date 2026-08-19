import { useState } from "react";

function PlannerPage({
  movieNight,
  movieNights,
  onMovieNightChange,
  onCreateMovieNight,
  onDeleteMovieNight,
  selectedMovieNight,
  onSelectMovieNight,
  onStartEditMovieNight,
  editingMovieNightId,
  watchlist,
  onAddToMovieNight,
  onDeleteFromMovieNight,
}) {
  const [watchlistSearchTerm, setWatchlistSearchTerm] = useState("");
  const [submittedWatchlistSearch, setSubmittedWatchlistSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredWatchlist = watchlist.filter((movie) => {
    return movie.title
      .toLowerCase()
      .includes(submittedWatchlistSearch.toLowerCase());
  });
  const hasWatchlistSearch = submittedWatchlistSearch.trim().length > 0;

  function handleWatchlistSearchSubmit(event) {
    event.preventDefault();

    setSubmittedWatchlistSearch(watchlistSearchTerm.trim());
  }

  return (
    <>
      <header className="page-header">
        <h1>Movie Night Planner</h1>
      </header>

      <button type="button" onClick={() => isFormOpen ? setIsFormOpen(false) : setIsFormOpen(true)}>
        + Movie Night
      </button>
      {isFormOpen && (
        <section className="planner-section">
          <form className="planner-form" onSubmit={onCreateMovieNight}>
            <label>
              Night title
              <input
                type="text"
                name="title"
                value={movieNight.title}
                onChange={onMovieNightChange}
                placeholder="Friday horror night"
              />
            </label>

            <label>
              Date
              <input
                type="date"
                name="date"
                value={movieNight.date}
                onChange={onMovieNightChange}
              />
            </label>

            <label>
              Location
              <input
                type="text"
                name="location"
                value={movieNight.location}
                onChange={onMovieNightChange}
                placeholder="Apartment"
              />
            </label>

            <label>
              Notes
              <textarea
                name="notes"
                value={movieNight.notes}
                onChange={onMovieNightChange}
                placeholder="Bring snacks"
              />
            </label>

            <button type="submit">
              {editingMovieNightId ? "Update Movie Night" : "Save Movie Night"}
            </button>
          </form>
        </section>
      )}

      <section className="saved-nights-section">
        <h2>Saved Movie Nights</h2>

        {movieNights.length > 0 ? (
          <ul>
            {movieNights.map((night) => {
              const isSelected = selectedMovieNight?.id === night.id;

              return (
                <li key={night.id} className="movie-night-card">
                  <h3>{night.title}</h3>

                  <div className="movie-night-actions">
                    <button
                      type="button"
                      onClick={() => onSelectMovieNight(night.id)}
                    >
                      {isSelected ? "Hide Details" : "View Details"}
                    </button>

                    <button
                      type="button"
                      onClick={() => onStartEditMovieNight(night)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => onDeleteMovieNight(night.id)}
                    >
                      Delete
                    </button>
                  </div>

                  {isSelected && (
                    <div className="movie-night-details">
                      <p>{night.date || "No date selected"}</p>
                      <p>{night.location || "No location added"}</p>
                      <p>{night.notes || "No notes yet"}</p>

                      <div className="movie-night-options">
                        <h4>Movie Options</h4>

                        <div className="movie-night-selected-movies">
                          {night.movies && night.movies.length > 0 ? (
                            <ul>
                              {night.movies.map((movie) => (
                                <li key={movie.id}>
                                  {movie.title}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onDeleteFromMovieNight(night.id, movie.id)
                                    }
                                  >
                                    Remove
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No movie options added yet.</p>
                          )}
                        </div>

                        {watchlist.length > 0 ? (
                          <>
                            <form onSubmit={handleWatchlistSearchSubmit}>
                              <input
                                type="text"
                                value={watchlistSearchTerm}
                                onChange={(event) =>
                                  setWatchlistSearchTerm(event.target.value)
                                }
                                placeholder="Search your watchlist..."
                              />

                              <button type="submit">Search Watchlist</button>
                            </form>

                            {!hasWatchlistSearch ? (
                              <p>Search your watchlist to add movie options.</p>
                            ) : filteredWatchlist.length > 0 ? (
                              <ul>
                                {filteredWatchlist.map((movie) => (
                                  <li key={movie.id}>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onAddToMovieNight(night.id, movie)
                                      }
                                    >
                                      Add {movie.title}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No saved movies match that search.</p>
                            )}
                          </>
                        ) : (
                          <p>Add movies to your watchlist first.</p>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No movie nights saved yet.</p>
        )}
      </section>
    </>
  );
}

export default PlannerPage;
