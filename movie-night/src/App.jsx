import { useState } from "react";
import { searchMovies} from "./api/tmdb.js"; // Import the searchMovies function from the TMDB API module
import SearchForm from "./components/SearchForm.jsx";
import MovieList from "./components/MovieList.jsx";
import Watchlist from "./components/Watchlist.jsx";

function App() {
  const [movies, setMovies] = useState([]); // State to hold the list of movies returned from the search
  const [isLoading, setIsLoading] = useState(false); // State to track if the app is currently loading data from the API
  const [errorMessage, setErrorMessage] = useState(""); // State to hold any error messages from the API
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState("popularity"); // State to track the current sorting option for the movie list, defaulting to sorting by popularity in descending order
  
  async function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    if(!searchTerm.trim()){
      return; // Don't perform the search if the search term is empty or only contains whitespace
    }

    setSubmittedSearch(searchTerm); // Update the submitted search term state to trigger the MovieList component to render the search results
    setIsLoading(true); // Set loading state to true while fetching data from the API
    setErrorMessage(""); // Clear any previous error messages

    try {
      const results = await searchMovies(searchTerm); // Call the searchMovies function to fetch movies from the TMDB API based on the search term
      setMovies(results); // Update the movies state with the results from the API
    } catch (error) {
      setErrorMessage("Something went wrong while fetching movies."); // If there's an error during the API call, update the error message state with the error message
    } finally {
      setIsLoading(false); // Set loading state to false after the API call is complete, regardless of success or failure
    }
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

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.popularity - a.popularity; // Sort movies by popularity in descending order
    }
    if (sortBy === "rating") {
      return b.vote_average - a.vote_average; // Sort movies by rating in descending order
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title); // Sort movies by title in alphabetical order
    }
    return 0; // If no sorting option is selected, return 0 to keep the original order
  })

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
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <MovieList
        submittedSearch={submittedSearch}
        movies={sortedMovies}
        watchlist={watchlist}
        sortBy={sortBy}
        setSortBy={setSortBy}
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