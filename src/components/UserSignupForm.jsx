import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postUsers from "../api/post-users.js";
import postLogin from "../api/post-login.js";
import useAuth from "../hooks/use-auth.js";

function UserSignupForm() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    emailaddress: "",
    isstaff: false,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
      const { id, value } = event.target;
      setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          [id]: value,
      }));
  };

  const validateForm = () => {
    console.log("Validating form:", userDetails); // Log the userDetails to inspect the values

    if (!userDetails.username) {
      setError("Username is required.");
      return false;
    }
    if (!userDetails.password) {
      setError("Password is required.");
      return false;
    }
    if (!userDetails.firstname) {
      setError("First name is required.");
      return false;
    }
    if (!userDetails.lastname) {
      setError("Last name is required.");
      return false;
    }
    if (!userDetails.emailaddress) {
      setError("Email address is required.");
      return false;
    }
  return true;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit triggered");

    setError("");
    if (!validateForm()) {
      console.log("Form validation failed");

      return;
    }

    setIsSubmitting(true);
    console.log("Form validation passed, starting submission");

    
    try {
      // Call the postUsers function to create a new user
      const response = await postUsers(
        userDetails.username,
        userDetails.password,
        userDetails.firstname,
        userDetails.lastname,
        userDetails.emailaddress,
        userDetails.isstaff
      );
      console.log("User signed up successfully:", response);

      // Now log the user in after successful signup
      const loginResponse = await postLogin(userDetails.username, userDetails.password);
      console.log("User logged in successfully:", loginResponse);

      // Store the token and user ID in localStorage and set the auth context
      window.localStorage.setItem("token", loginResponse.token);
      window.localStorage.setItem("userID", loginResponse.user_id);
      setAuth({
        token: loginResponse.token,
        userID: loginResponse.user_id,
      });

      // Redirect to homepage after successful signup and login
      navigate("/");
    } catch (error) {
      console.error("Error during signup or login:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
      {error && (
        <div className="error-popup">
          <p>{error}</p>
        </div>
      )}
        <div>
          <label htmlFor="username">Enter your username</label>
          <input type="text" id="username" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">Enter your password</label>
          <input type="password" id="password" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="firstname">Enter your firstname</label>
          <input type="text" id="firstname" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="lastname">Enter your lastname</label>
          <input type="text" id="lastname" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="emailaddress">Enter your email address</label>
          <input type="text" id="emailaddress" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn" disabled={isSubmitting}>{isSubmitting ? "Signing up..." : "Sign up"}</button>
      </form>
    </div>
  );
}
  
export default UserSignupForm;