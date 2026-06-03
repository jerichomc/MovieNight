import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

  function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    console.log('Searching for:', searchTerm); // Log the search term to the console
  }

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

      </div>
    </main>
  );
}

export default App;