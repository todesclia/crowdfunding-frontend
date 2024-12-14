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
    const [error, setError] = useState('');

    const loginSchema = z.object({
      username: z.string().min(1, { message: "Username must not be empty" }),
      password: z.string().min(1, { message: "Password must not be empty" }),
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const result = loginSchema.safeParse(credentials);
      if (!result.success) {
        const error = result.error.errors?.[0];
        if (error) {
          setError(error.message);
        }
        return;
      }
      try {
        const response = await postLogin(result.data.username, result.data.password);
        console.log(response);
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("userID", response.user_id);
        
        setAuth({
          token: response.token,
          userID: response.user_id,
        });
        
        navigate("/");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.non_field_errors) {
          setError(err.response.data.non_field_errors[0]);
        } else {
          setError("An error occurred. Please try again.");
        }      
      }
    };
        
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-popup">{error}</div>}
          <div>
            <label htmlFor="username">Enter your username</label>
            <input type="text" id="username" onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="password">Enter your password</label>
            <input type="password" id="password" onChange={handleChange} />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    );
  }
  
  export default LoginForm;