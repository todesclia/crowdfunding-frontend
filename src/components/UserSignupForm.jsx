import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postUsers from "../api/post-users.js";
import postLogin from "../api/post-login.js";


function UserSignupForm() {
    const navigate = useNavigate(); 
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
          return postLogin(userDetails.username, userDetails.password);
        })
        .then((response2) => {
            window.localStorage.setItem("token", response2.token);
            setAuth({
              token: response2.token,
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("Error during signup or login:", error);
          });
          //window.localStorage.setItem("token", response.token);
        }
    };

    return (
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  export default UserSignupForm;