import { useState } from "react";

const mockMovies = [
  {
    id: 1,
    title: "Spider-Man: Into the Spider-Verse",
    year: "2018",
    overview:
      "Teen Miles Morales becomes Spider-Man and discovers a multiverse of Spider-heroes.",
  },
  {
    id: 2,
    title: "The Batman",
    year: "2022",
    overview:
      "Batman investigates corruption in Gotham while hunting a mysterious killer.",
  },
  {
    id: 3,
    title: "Everything Everywhere All at Once",
    year: "2022",
    overview:
      "A laundromat owner is pulled into a wild multiverse adventure to save existence.",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = mockMovies.filter((movie) => {
    return movie.title.toLowerCase().includes(submittedSearch.toLowerCase());
  });

  function handleSearch(event) {
    event.preventDefault();
    setSubmittedSearch(searchTerm);
  }

  function handleAddToWatchlist(movie) {
    const movieAlreadySaved = watchlist.some((savedMovie) => {
      return savedMovie.id === movie.id;
    });

    if (!movieAlreadySaved) {
      setWatchlist([...watchlist, movie]);
    }
  }

  function handleRemoveFromWatchlist(movieId) {
    setWatchlist(watchlist.filter((movie) => movie.id !== movieId));
  }

  function handlePickRandomMovie() {
    const randomIndex = Math.floor(Math.random() * watchlist.length);
    const randomMovie = watchlist[randomIndex];

    setSelectedMovie(randomMovie);
  }

  return (
    <main>
      <header>
        <h1>Movie Night</h1>
        <p>Plan movies, snacks, guests, and watch nights.</p>
      </header>

      <section className="search-section">
        <h2>Search Movies</h2>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </section>

      {submittedSearch && (
        <section className="results-section">
          <h2>Search Results for "{submittedSearch}"</h2>

          {filteredMovies.length > 0 ? (
            <ul>
              {filteredMovies.map((movie) => (
                <li key={movie.id} className="movie-card">
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  <p>{movie.overview}</p>

                  <button
                    type="button"
                    onClick={() => handleAddToWatchlist(movie)}
                  >
                    Add to Watchlist
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No movies found.</p>
          )}
        </section>
      )}

      <section className="watchlist-section">
        <h2>Watchlist</h2>
        <p>{watchlist.length} saved movies</p>

        <button
          type="button"
          onClick={handlePickRandomMovie}
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
                  onClick={() => handleRemoveFromWatchlist(movie.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your watchlist is empty.</p>
        )}

        {selectedMovie && (
          <div className="selected-movie">
            <h3>Tonight's pick</h3>
            <p>{selectedMovie.title}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;