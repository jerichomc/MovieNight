import { useState } from "react";
import { searchMovies} from "./api/tmdb.js"; // Import the searchMovies function from the TMDB API module
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
  const [movies, setMovies] = useState([]); // State to hold the list of movies returned from the search
  const [isLoading, setIsLoading] = useState(false); // State to track if the app is currently loading data from the API
  const [errorMessage, setErrorMessage] = useState(""); // State to hold any error messages from the API
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
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
      console.log(results)
      setMovies(results); // Update the movies state with the results from the API
    } catch (error) {
      console.log(error);
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
        movies={movies}
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