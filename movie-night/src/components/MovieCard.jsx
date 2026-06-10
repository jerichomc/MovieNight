function MovieCard({ movie, children }) {
    return (
        <li className="movie-card">
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>

            {movie.overview && <p>{movie.overview}</p>}

            {children} 
        </li>
    )
}
//children will be whatever is passed in as the content of the component like a button or other elements
export default MovieCard;