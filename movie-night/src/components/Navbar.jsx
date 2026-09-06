import { NavLink, Link } from "react-router-dom";

function Navbar(){
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                Movie Night
            </Link>

            <div className="navbar-links">  
                <NavLink to="/" end>Search</NavLink>
                <NavLink to="/watchlist">Watchlist</NavLink>
                <NavLink to="/watched">Films</NavLink>
                <NavLink to="/planner">Planner</NavLink>
                <NavLink to="/auth">Login</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;