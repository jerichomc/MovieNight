function SearchForm({ searchTerm, setSearchTerm, onSearch}) {
    return (
        <section className="search-section">
            <h2>Search Movies</h2>

            <form onSubmit={onSearch}>
                <input type="text"
                placeholder="Search for movies..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                ></input>
                <button type="submit">Search</button>
            </form>
        </section>
    );
}

export default SearchForm;