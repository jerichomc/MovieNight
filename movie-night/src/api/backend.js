const API_BASE_URL = 'http://localhost:5000';

export async function checkApiHealth() {
    const response = await fetch(`${API_BASE_URL}/api/health`);

    if(!response.ok){
        throw new Error('Failed to connect to backend');
    }

    return response.json();
}

export async function getWatchlist() {
  const response = await fetch(`${API_BASE_URL}/api/watchlist`);

  if (!response.ok) {
    throw new Error("Failed to load watchlist");
  }

  return response.json();
}

export async function addMovieToWatchlist(movie) {
    const response = await fetch(`${API_BASE_URL}/api/watchlist`, { // Add a movie to the watchlist
        method: 'POST', // Specify the HTTP method as POST
        headers: { // Set the request headers
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    });

    if (!response.ok) {
        throw new Error('Failed to add movie to watchlist');
    }

    return response.json(); // Return the added movie as JSON
}

export async function deleteMovieFromWatchlist(movieId){
    const response = await fetch(`${API_BASE_URL}/api/watchlist/${movieId}`, { // Delete a movie from the watchlist
        method: 'DELETE' // Specify the HTTP method as DELETE
    });

    if (!response.ok) {
        throw new Error('Failed to delete movie from watchlist');
    }
}

export async function getWatchedMovies() {
    const response = await fetch(`${API_BASE_URL}/api/watched`);

    if(!response.ok){
        throw new Error('Failed to load watched movies');
    }

    return response.json();
}

export async function addWatchedMovie(movie) {
    const response = await fetch(`${API_BASE_URL}/api/watched`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(movie) // Convert the movie object to a JSON string for the request body
    });

    if(!response.ok){
        throw new Error('Failed to add movie to watched list');
    }

    return response.json(); //parse saved movie returnd from backend
}

export async function deleteWatchedMovie(movieId){
    const response = await fetch(`${API_BASE_URL}/api/watched/${movieId}`, { // Delete a movie from the watchlist
        method: 'DELETE' // Specify the HTTP method as DELETE
    });

    if(!response.ok) {
        throw new Error('Failed to delete movie from watched list');
    }
}

export async function updateWatchedMovie(movieId, updatedFields){
    const response = await fetch(`${API_BASE_URL}/api/watched/${movieId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(updatedFields)
    });

    if(!response.ok){
        throw new Error('Failed to update movie.');
    }

    return response.json(); //parse updated movie returned from backend
}