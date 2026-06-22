import { Link } from "react-router-dom";

function Navbar(){
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                Movie Night
            </Link>

            <div className="navbar-links">  
                <Link to="/">Search</Link>
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/planner">Planner</Link>
            </div>
        </nav>
    );
}

export default Navbar;