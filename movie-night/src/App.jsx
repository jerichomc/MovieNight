import { useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import MovieList from "./components/MovieList.jsx";
import Watchlist from "./components/Watchlist.jsx";

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
    event.preventDefault(); // Prevent the default form submission behavior
    setSubmittedSearch(searchTerm); // Update the submitted search term to trigger the movie list update
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

      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      <MovieList
        submittedSearch={submittedSearch}
        movies={filteredMovies}
        watchlist={watchlist}
        onAddToWatchlist={handleAddToWatchlist}
      />

      <Watchlist
        watchlist={watchlist}
        selectedMovie={selectedMovie}
        onRemoveFromWatchlist={handleRemoveFromWatchlist}
        onPickRandomMovie={handlePickRandomMovie}
      />
    </main>
  );
}

export default App;