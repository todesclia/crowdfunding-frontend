import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./RippleRise.css";

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
       window.localStorage.removeItem("token");
       setAuth({ token: null });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Ripple Rise</Link>
        </div>
        <div className="navbar-links">
          <Link to="/projects">View Projects</Link>
          {auth.token ? (
            <Link to="/" onClick={handleLogout}>
                Logout
            </Link>
            ) : (
            <Link to="/login">Login</Link>
          )}
          {!auth.token && <Link to="/usersignup">Sign Up</Link>}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
