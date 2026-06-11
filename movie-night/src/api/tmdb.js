const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Access the TMDB API key from environment variables
const BASE_URL = "https://api.themoviedb.org/3"; // Base URL for TMDB API

export async function searchMovies(query) {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
    );
    if(!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data.results; // Return the list of movies from the API response
}