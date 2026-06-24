function PlannerPage({movieNight, movieNights, onMovieNightChange, onCreateMovieNight}) {
  return (
    <>
      <header className="page-header">
        <h1>Movie Night Planner</h1>
      </header>
      <section className="planner-section">
        <form className="planner-form" onSubmit={onCreateMovieNight}>
          <label>
            Night title
            <input
              type="text"
              name="title"
              value={movieNight.title}
              onChange={onMovieNightChange}
              placeholder="Friday horror night"
            ></input>
          </label>

          <label>
            Date
            <input
              type="date"
              name="date"
              value={movieNight.date}
              onChange={onMovieNightChange}
            />
          </label>

          <label>
            Location
            <input
              type="text"
              name="location"
              value={movieNight.location}
              onChange={onMovieNightChange}
              placeholder="apartment"
            />
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={movieNight.notes}
              onChange={onMovieNightChange}
              placeholder="bring snacks"
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </section>

      <section className="saved-nights-section">
        <h2>Saved Movie Nights</h2>

        {movieNights.length > 0 ? (
          <ul>
            {movieNights.map((night) => (
              <li key={night.id} className="movie-night-card">
                <h3>{night.title}</h3>
                <p>{night.date || "No date selected"}</p>
                <p>{night.location || "No location added"}</p>
                <p>{night.notes || ""}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movie nights saved yet.</p>
        )}
      </section>
    </>
  );
}

export default PlannerPage;