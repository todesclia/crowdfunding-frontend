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
        <Link to="/">Home</Link>
        <Link to="/addproject">Projects</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
              Logout
          </Link>
          ) : (
          <Link to="/login">Login</Link>
        )}
        {!auth.token && <Link to="/usersignup">Sign Up</Link>}

      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
