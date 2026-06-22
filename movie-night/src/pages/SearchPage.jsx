import SearchForm from "../components/SearchForm.jsx";
import MovieList from "../components/MovieList.jsx";

function SearchPage({
  searchTerm,
  setSearchTerm,
  onSearch,
  clearSearch,
  isLoading,
  errorMessage,
  submittedSearch,
  movies,
  watchlist,
  sortBy,
  setSortBy,
  currentPage,
  totalPages,
  handleChangePage,
  handlePageSelect,
  onAddToWatchlist,
}) {
  return (
    <>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={onSearch}
        clearSearch={clearSearch}
      />

      {isLoading && <p className="status-message">Loading...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isLoading && (
        <MovieList
          submittedSearch={submittedSearch}
          movies={movies}
          watchlist={watchlist}
          sortBy={sortBy}
          setSortBy={setSortBy}
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          handlePageSelect={handlePageSelect}
          onAddToWatchlist={onAddToWatchlist}
        />
      )}
    </>
  );
}

export default SearchPage;