import MovieCard from "../components/MovieCard.jsx";

function WatchedPage({ watchedMovies }) {
  return (
    <>
      <header className="page-header">
        <h1>Watched Movies</h1>
        <p>Track movies you have seen and rated.</p>
      </header>

      <section className="watched-section">
        {watchedMovies.length > 0 ? (
          <ul>
            {watchedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}>
                <p>Your rating: {movie.userRating || "Not rated yet"}</p>
              </MovieCard>
            ))}
          </ul>
        ) : (
          <p>No watched movies yet.</p>
        )}
      </section>
    </>
  );
}

export default WatchedPage;