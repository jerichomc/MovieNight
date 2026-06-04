import { useState } from "react";

const mockMovies = [
  {
    id: 1,
    title: 'Spider-Man: Into the Spider-Verse',
    year: '2018',
    overview: 'Teen Miles Morales becomes Spider-Man and discovers a multiverse of Spider-heroes.',
  },
  {
    id: 2,
    title: 'The Batman',
    year: '2022',
    overview: 'Batman investigates corruption in Gotham while hunting a mysterious killer.',
  },
  {
    id: 3,
    title: 'Everything Everywhere All at Once',
    year: '2022',
    overview: 'A laundromat owner is pulled into a wild multiverse adventure to save existence.',
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const [submittedSearch, setSubmittedSearch] = useState(""); // State to hold the submitted search term

  function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    setSubmittedSearch(searchTerm); // Update the submitted search term state
  }

  const filteredMovies = mockMovies.filter((movie) => {
    return movie.title.toLowerCase().includes(submittedSearch.toLowerCase());
  });

  return (
    <main>
      <h1>Movie Night</h1>
      <p>plan movies, snacks, guests, and watch nights</p>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          {/* Update the search term state on input change */}
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {submittedSearch && (
          <section>
            <h2>Search Results for "{submittedSearch}"</h2>

            {filteredMovies.length > 0 ? (
              <ul>
                {filteredMovies.map((movie) => (
                  <li key={movie.id} className="movie-card">
                    <h3>{movie.title}</h3>
                    <p>({movie.year})</p>
                    <p>{movie.overview}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No movies found.</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
