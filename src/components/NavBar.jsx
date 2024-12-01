import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
       window.localStorage.removeItem("token");
       setAuth({ token: null });
  };

  return (
    <div>
      <nav className="nav-bar"> 
        <Link to="/">Home</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
              Log Out
          </Link>
          ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/usersignup">User Signup</Link>
        <Link to="/project">Project</Link>  
        <Link to="/addproject">Add Project</Link>  
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
