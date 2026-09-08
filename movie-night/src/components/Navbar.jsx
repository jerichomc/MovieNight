import { NavLink, Link } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Movie Night
      </Link>

      <div className="navbar-links">
        <NavLink to="/" end>
          Search
        </NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
        <NavLink to="/watched">Films</NavLink>
        <NavLink to="/planner">Planner</NavLink>
        {currentUser ? (
          <div className="navbar-user">
            <span>Hello, {currentUser.username}</span>
            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/auth">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
