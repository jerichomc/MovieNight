function SearchForm({ searchTerm, setSearchTerm, onSearch}) {
    return (
        <section className="search-section">
            <h2>Search Movies</h2>

            <form onSubmit={onSearch}> 
                <input type="text" 
                placeholder="Search for movies..."
                value={searchTerm} // Update the search term as the user types
                onChange={(event) => setSearchTerm(event.target.value)} // Update the search term state on input change
                ></input>
                <button type="submit">Search</button>
            </form>
        </section>
    );
}

export default SearchForm;