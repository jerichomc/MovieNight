function PlannerPage({movieNight, onMovieNightChange}) {
  return (
    <>
    <header className="page-header">
      <h1>Movie Night Planner</h1>
    </header>
    <section className="planner-section">
      <form className="planner-form">
        <label>
          Night title 
          <input type="text"
          name="title"
          value={movieNight.title}
          onChange={onMovieNightChange}
          placeholder="Friday horror night">
          </input>
        </label>

        <label>
          Date 
          <input type="date"
          name="date"
          value={movieNight.date}
          onChange={onMovieNightChange}/>
        </label>

        <label>
          Location 
          <input type="text"
          name="location"
          value={movieNight.location}
          onChange={onMovieNightChange}
          placeholder="apartment"/>
        </label>

        <label>
          Notes 
          <textarea name="notes"
          value={movieNight.notes}
          onChange={onMovieNightChange}
          placeholder="bring snacks"/>
        </label>
      </form>
    </section>
    </>
  );
}

export default PlannerPage;