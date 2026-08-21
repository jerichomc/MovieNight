import { useState, useEffect } from "react";
import { searchMovies } from "./api/tmdb.js"; // Import the searchMovies function from the TMDB API module
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import PlannerPage from "./pages/PlannerPage.jsx";
import WatchedPage from "./pages/WatchedPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import {
  checkApiHealth,
  getWatchlist,
  addMovieToWatchlist,
  deleteMovieFromWatchlist,
  getWatchedMovies,
  addWatchedMovie,
  deleteWatchedMovie,
  updateWatchedMovie,
  getMovieNights,
  createMovieNight,
  updateMovieNight,
  deleteMovieNight,
  addMovieToMovieNight,
  deleteMovieFromMovieNight,
} from "./api/backend.js";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState([]); // State to hold the list of movies returned from the search
  const [isLoading, setIsLoading] = useState(false); // State to track if the app is currently loading data from the API
  const [errorMessage, setErrorMessage] = useState(""); // State to hold any error messages from the API
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [apiStatus, setApiStatus] = useState("");
  useEffect(() => {
    async function loadApiStatus() {
      try {
        const data = await checkApiHealth();
        setApiStatus(data.message);
      } catch (error) {
        console.error(error);
        setApiStatus("Backend not connected");
      }
    }

    loadApiStatus();
  }, []);
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    //this uses backend to retrieve watchlist and sets it to state on load
    async function loadWatchlist() {
      try {
        const data = await getWatchlist();
        setWatchlist(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadWatchlist();
  }, []);

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
  const [movieNights, setMovieNights] = useState([]);

  useEffect(() => {
    async function loadMovieNights() {
      try {
        const data = await getMovieNights();
        setMovieNights(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadMovieNights();
  }, []);

  const [selectedMovieNightId, setSelectedMovieNightId] = useState(null);

  const selectedMovieNight = movieNights.find((night) => {
    return night.id === selectedMovieNightId;
  });
  const [editingMovieNightId, setEditingMovieNightId] = useState(null);

  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    async function loadWatchedMovies() {
      try {
        const data = await getWatchedMovies();
        setWatchedMovies(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadWatchedMovies(); // Load watched movies from the backend when the component mounts
  }, []);

  const [movieReview, setMovieReview] = useState({
    rating: "",
    review: "",
  });
  const [reviewContext, setReviewContext] = useState(null);

  useEffect(() => {
    if (location.pathname !== "/review" && reviewContext) {
      setReviewContext(null);
      setMovieReview({
        rating: "",
        review: "",
      });
    }
  }, [location.pathname]);

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

  async function handleAddToWatchlist(movie) {
    const movieAlreadySaved = watchlist.some((savedMovie) => {
      //check if any movie matches id
      return savedMovie.id === movie.id;
    });
    if (movieAlreadySaved) {
      return;
    }

    try {
      const savedMovie = await addMovieToWatchlist(movie); //try adding from backend
      setWatchlist([...watchlist, savedMovie]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveFromWatchlist(movieId) {
    try {
      await deleteMovieFromWatchlist(movieId);

      setWatchlist(
        watchlist.filter((movie) => {
          return movie.id !== movieId; //filter given id movie out
        }),
      );
    } catch (error) {
      console.error(error);
    }
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

  function handleClearMovieNightForm() {
    setEditingMovieNightId(null);

    setMovieNight({
      title: "",
      date: "",
      location: "",
      notes: "",
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

  async function handleCreateMovieNight(event) {
    event.preventDefault();

    if (!movieNight.title.trim()) {
      return;
    }

    const movieNightData = {
      title: movieNight.title.trim(),
      date: movieNight.date,
      location: movieNight.location.trim(),
      notes: movieNight.notes.trim(),
    };

    if (editingMovieNightId) {
      try {
        const updatedNight = await updateMovieNight(
          editingMovieNightId,
          movieNightData,
        );

        setMovieNights(
          movieNights.map((night) => {
            if (night.id === editingMovieNightId) {
              return updatedNight;
            }

            return night;
          }),
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const createdNight = await createMovieNight(movieNightData);

        setMovieNights([...movieNights, createdNight]);
      } catch (error) {
        console.error(error);
      }
    }

    setEditingMovieNightId(null);

    setMovieNight({
      title: "",
      date: "",
      location: "",
      notes: "",
    });
  }

  async function handleDeleteMovieNight(movieNightId) {
    try {
      await deleteMovieNight(movieNightId);

      setMovieNights(
        movieNights.filter((night) => {
          return night.id !== movieNightId;
        }),
      );
    } catch (error) {
      console.error(error);
    }
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

  async function handleAddMovieToNight(movieNightId, movie) {
    try {
      const updatedNight = await addMovieToMovieNight(movieNightId, movie);

      setMovieNights(
        movieNights.map((night) => {
          if (night.id === movieNightId) {
            return updatedNight;
          }

          return night;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteFromMovieNight(movieNightId, movieId) {
    try {
      const updatedNight = await deleteMovieFromMovieNight(movieNightId, movieId);

      setMovieNights(
        movieNights.map((night) => {
          if (night.id === movieNightId) {
            return updatedNight;
          }

          return night;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleStartReview(movie, options = {}) {
    const existingWatchedMovie = watchedMovies.find((watchedMovie) => {
      return watchedMovie.id === movie.id;
    });
    const reviewMovie = existingWatchedMovie || movie;

    setMovieReview({
      rating: reviewMovie.userRating || "",
      review: reviewMovie.review || "",
    });

    setReviewContext({
      movie: reviewMovie,
      returnPath: options.returnPath || location.pathname,
      removeFromWatchlist: options.removeFromWatchlist || false,
    });

    navigate("/review");
  }

  function handleReviewChange(event) {
    //update state as user types
    const { name, value } = event.target; //get needed values from target

    setMovieReview({
      ...movieReview,
      [name]: value,
    });
  }

  async function handleSaveMovieReview(movie) {
    const watchedMovie = {
      ...movie,
      userRating: movieReview.rating,
      review: movieReview.review,
      watchedAt: new Date().toISOString(),
    };

    const movieAlreadyWatched = watchedMovies.some((watchedMovie) => {
      return watchedMovie.id === movie.id;
    });

    try {
      if (movieAlreadyWatched) {
        const updatedMovie = await updateWatchedMovie(movie.id, watchedMovie);

        setWatchedMovies(
          watchedMovies.map((existingMovie) => {
            if (existingMovie.id === movie.id) {
              return updatedMovie;
            }

            return existingMovie;
          }),
        );
      } else {
        const savedMovie = await addWatchedMovie(watchedMovie);

        setWatchedMovies([...watchedMovies, savedMovie]);
      }

      setMovieReview({
        rating: "",
        review: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveWatchedMovie(movieId) {
    try {
      await deleteWatchedMovie(movieId);

      setWatchedMovies(
        watchedMovies.filter((movie) => {
          return movie.id !== movieId;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSaveActiveReview() {
    if (!reviewContext) {
      return;
    }

    await handleSaveMovieReview(reviewContext.movie);

    if (reviewContext.removeFromWatchlist) {
      await handleRemoveFromWatchlist(reviewContext.movie.id);
    }

    const returnPath = reviewContext.returnPath || "/watched";
    setReviewContext(null);
    navigate(returnPath);
  }

  function handleCancelReview() {
    const returnPath = reviewContext?.returnPath || "/";

    setReviewContext(null);
    setMovieReview({
      rating: "",
      review: "",
    });

    navigate(returnPath);
  }

  return (
    <>
      <Navbar />
      <p>{apiStatus}</p>

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
                onStartReview={handleStartReview}
                watchedMovies={watchedMovies}
              />
            }
          />

          <Route
            path="/watched"
            element={
              <WatchedPage
                watchedMovies={watchedMovies}
                onRemoveWatchedMovie={handleRemoveWatchedMovie}
                onStartReview={handleStartReview}
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
                onStartReview={(movie) =>
                  handleStartReview(movie, {
                    returnPath: "/watchlist",
                    removeFromWatchlist: true,
                  })
                }
              />
            }
          />

          <Route
            path="/review"
            element={
              <ReviewPage
                movie={reviewContext?.movie}
                movieReview={movieReview}
                onMovieReviewChange={handleReviewChange}
                onSaveReview={handleSaveActiveReview}
                onCancelReview={handleCancelReview}
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
                onClearMovieNightForm={handleClearMovieNightForm}
                onAddToMovieNight={handleAddMovieToNight}
                onDeleteFromMovieNight={handleDeleteFromMovieNight}
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
