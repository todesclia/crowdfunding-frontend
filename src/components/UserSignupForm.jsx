import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postUsers from "../api/post-users.js";


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

            ).then((response) => {
                // window.localStorage.setItem("token", response.token);
                navigate("/");
            });
        }
    };

    return (
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter username" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter Password" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="firstname">Firstname:</label>
          <input type="text" id="firstname" placeholder="Enter firstname" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="lastname">Lastname:</label>
          <input type="text" id="lastname" placeholder="Enter lastname" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="emailaddress">Email:</label>
          <input type="text" id="emailaddress" placeholder="Enter email" onChange={handleChange}/>
        </div>
        <button type="submit" SubmitonClick={handleSubmit}></button>
      </form>
    );
  }
  
  export default UserSignupForm;