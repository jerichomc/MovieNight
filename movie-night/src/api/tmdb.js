const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Access the TMDB API key from environment variables
const BASE_URL = "https://api.themoviedb.org/3"; // Base URL for TMDB API

export async function searchMovies(query, page = 1) {

    if (!API_KEY) {
        throw new Error("TMDB API key is not defined. Please set VITE_TMDB_API_KEY in your environment variables.");
    }
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${page}&include_adult=false`
    );
    if(!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return {
        results: data.results,
        totalPages: data.total_pages,
    }
}