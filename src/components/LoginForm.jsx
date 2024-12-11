import { useState } from "react";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import { z } from "zod";


function LoginForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const loginSchema = z.object({
      username: z.string().min(1, { message: "Username must not be empty" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const result = loginSchema.safeParse(credentials);
      if (!result.success) {
        const error = result.error.errors?.[0];
        if (error) {
          alert(error.message);
        }
        return;
      } else {
            postLogin(result.data.username, result.data.password).then((response) => {
              window.localStorage.setItem("token", response.token);
              window.localStorage.setItem("userID", response.user_id);
            setAuth({
              token: response.token,
              userID: response.user_id,
            });
            navigate("/");
            });
       }
    };
        
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Enter username" onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Password" onChange={handleChange} />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    );
  }
  
  export default LoginForm;