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
        
  const handleChange = (event) => {
      const { id, value } = event.target;
      setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          [id]: value,
      }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userDetails.username && userDetails.password) {
      postUsers(
        userDetails.username,
        userDetails.password,
        userDetails.firstname,
        userDetails.lastname,
        userDetails.emailaddress,
        userDetails.isstaff,
      )
      .then((response) => {
        console.log("User signed up successfully:", response);
        return postLogin(userDetails.username, userDetails.password);
      })
      .then((loginResponse) => {
        console.log("User logged in successfully:", loginResponse);
        window.localStorage.setItem("token", loginResponse.token);
        setAuth({
          token: loginResponse.token,
          userID: loginResponse.user_id,

        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during signup or login:", error);
      });
    } else {
      console.error("Username and password are required to sign up.");
    };
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="firstname">Firstname:</label>
          <input type="text" id="firstname" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="lastname">Lastname:</label>
          <input type="text" id="lastname" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="emailaddress">Email:</label>
          <input type="text" id="emailaddress" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}
  
export default UserSignupForm;