import { useState, useEffect } from "react";
import { searchMovies } from "./api/tmdb.js"; // Import the searchMovies function from the TMDB API module
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import PlannerPage from "./pages/PlannerPage.jsx";

function App() {
  const [movies, setMovies] = useState([]); // State to hold the list of movies returned from the search
  const [isLoading, setIsLoading] = useState(false); // State to track if the app is currently loading data from the API
  const [errorMessage, setErrorMessage] = useState(""); // State to hold any error messages from the API
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("movieNightWatchlist");

    if (savedWatchlist) {
      return JSON.parse(savedWatchlist);
    }

    return [];
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState("popularity"); // State to track the current sorting option for the movie list, defaulting to sorting by popularity in descending order
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page of search results for pagination purposes
  const [totalPages, setTotalPages] = useState(1); // State to track the total number of pages of search results returned from the API for pagination purposes
  const [movieNight, setMovieNight] = useState({
    title: "",
    date: "",
    location: "",
    notes: "",
  });
  const [movieNights, setMovieNights] = useState(() => {
    const savedMovieNights = localStorage.getItem("movieNightPlans");

    if (savedMovieNights) {
      return JSON.parse(savedMovieNights);
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem("movieNightPlans", JSON.stringify(movieNights));
  }, [movieNights]);

  const [selectedMovieNightId, setSelectedMovieNightId] = useState(null);

  const selectedMovieNight = movieNights.find((night) => {
    return night.id === selectedMovieNightId;
  });
  const [editingMovieNightId, setEditingMovieNightId] = useState(null);

  useEffect(() => {
    localStorage.setItem("movieNightWatchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  async function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const trimmedSearch = searchTerm.trim(); // Trim whitespace from the search term before sending it to the API

    if (!trimmedSearch) {
      return; // Don't perform the search if the search term is empty or only contains whitespace
    }

    setSubmittedSearch(trimmedSearch); // Update the submitted search term state to trigger the MovieList component to render the search results
    setIsLoading(true); // Set loading state to true while fetching data from the API
    setErrorMessage(""); // Clear any previous error messages
    setMovies([]); // Clear any previous search results

    try {
      const data = await searchMovies(trimmedSearch, 1); // Call the searchMovies function from the TMDB API module with the trimmed search term and page number 1 for pagination
      setMovies(data.results);
      setTotalPages(data.totalPages); // Update the total pages state with the total number of pages returned from the API
      setCurrentPage(1); // Reset the current page to 1 when a new search is performed
    } catch (error) {
      console.error(error); // Log any errors to the console for debugging purposes
      setErrorMessage("Something went wrong while fetching movies."); // If there's an error during the API call, update the error message state with the error message
    } finally {
      setIsLoading(false); // Set loading state to false after the API call is complete, regardless of success or failure
    }
  }

  async function handlePageChange(nextPage) {
    setIsLoading(true); // Set loading state to true while fetching data from the API
    setErrorMessage(""); // Clear any previous error messages

    try {
      const data = await searchMovies(submittedSearch, nextPage); // Call the searchMovies function from the TMDB API module with the current submitted search term and the next page number for pagination
      setMovies(data.results);
      setTotalPages(data.totalPages); // Update the total pages state with the total number of pages returned from the API
      setCurrentPage(nextPage); // Update the current page state to the next page number
    } catch (error) {
      console.error(error); // Log any errors to the console for debugging purposes
      setErrorMessage("Something went wrong while fetching movies."); // If there's an error during the API call, update the error message state with the error message
    } finally {
      setIsLoading(false); // Set loading state to false after the API call is complete, regardless of success or failure
    }
  }

  async function handlePageSelect(pageNumber) {
    setIsLoading(true); // Set loading state to true while fetching data from the API
    setErrorMessage(""); // Clear any previous error messages

    try {
      const data = await searchMovies(submittedSearch, pageNumber); // Call the searchMovies function from the TMDB API module with the current submitted search term and the selected page number for pagination
      setMovies(data.results);
      setTotalPages(data.totalPages); // Update the total pages state with the total number of pages returned from the API
      setCurrentPage(pageNumber); // Update the current page state to the selected page number
    } catch (error) {
      console.error(error); // Log any errors to the console for debugging purposes
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
  function clearSearch() {
    setSubmittedSearch("");
    setMovies([]);
    setErrorMessage("");
    setSearchTerm("");
  }

  function handleClearSelectedMovie() {
    setSelectedMovie(null);
  }

  function handleMovieNightChange(event) {
    const { name, value } = event.target;

    setMovieNight({
      ...movieNight,
      [name]: value,
    });
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
  });

  function handleCreateMovieNight(event) {
    event.preventDefault();

    if (!movieNight.title.trim()) {
      return;
    }

    if (editingMovieNightId) {
      setMovieNights(
        movieNights.map((night) => {
          if (night.id === editingMovieNightId) {
            return {
              ...night,
              title: movieNight.title.trim(),
              date: movieNight.date,
              location: movieNight.location.trim(),
              notes: movieNight.notes.trim(),
            };
          }

          return night;
        }),
      );
    } else {
      const newMovieNight = {
        id: crypto.randomUUID(),
        title: movieNight.title.trim(),
        date: movieNight.date,
        location: movieNight.location.trim(),
        notes: movieNight.notes.trim(),
        movies: [],
        guests: [],
        snacks: [],
      };

      setMovieNights([...movieNights, newMovieNight]);
    }

    setEditingMovieNightId(null);

    setMovieNight({
      title: "",
      date: "",
      location: "",
      notes: "",
    });
  }

  function handleDeleteMovieNight(movieNightId) {
    setMovieNights(movieNights.filter((night) => night.id !== movieNightId));
  }

  function handleSelectMovieNight(movieNightId) {
    if (selectedMovieNightId === movieNightId) {
      setSelectedMovieNightId(null);
    } else {
      setSelectedMovieNightId(movieNightId);
    }
  }
  function handleStartEditMovieNight(night) {
    setEditingMovieNightId(night.id);

    setMovieNight({
      title: night.title,
      date: night.date,
      location: night.location,
      notes: night.notes,
    });
  }

  function handleAddMovieToNight(movieNightId, movie) {
    setMovieNights(
      movieNights.map((night) => {
        if (night.id !== movieNightId) {
          return night;
        }

        const currentMovies = night.movies || [];

        const movieAlreadyAdded = currentMovies.some((savedMovie) => {
          return savedMovie.id === movie.id;
        });

        if (movieAlreadyAdded) {
          return night;
        }

        return {
          ...night,
          movies: [...currentMovies, movie],
        };
      }),
    );
  }

  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
                clearSearch={clearSearch}
                isLoading={isLoading}
                errorMessage={errorMessage}
                submittedSearch={submittedSearch}
                movies={sortedMovies}
                watchlist={watchlist}
                sortBy={sortBy}
                setSortBy={setSortBy}
                currentPage={currentPage}
                totalPages={totalPages}
                handleChangePage={handlePageChange}
                handlePageSelect={handlePageSelect}
                onAddToWatchlist={handleAddToWatchlist}
              />
            }
          />

          <Route
            path="/watchlist"
            element={
              <WatchlistPage
                watchlist={watchlist}
                selectedMovie={selectedMovie}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                onPickRandomMovie={handlePickRandomMovie}
                onClearSelectedMovie={handleClearSelectedMovie}
              />
            }
          />

          <Route
            path="/planner"
            element={
              <PlannerPage
                movieNight={movieNight}
                movieNights={movieNights}
                onMovieNightChange={handleMovieNightChange}
                onCreateMovieNight={handleCreateMovieNight}
                onDeleteMovieNight={handleDeleteMovieNight}
                selectedMovieNight={selectedMovieNight}
                onSelectMovieNight={handleSelectMovieNight}
                editingMovieNightId={editingMovieNightId}
                onStartEditMovieNight={handleStartEditMovieNight}
                onAddToMovieNight={handleAddMovieToNight}
                watchlist={watchlist}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
