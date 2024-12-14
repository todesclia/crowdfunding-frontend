async function postUsers(username, password, firstname, lastname, emailaddress, isstaff) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
	      "first_name": firstname,
	      "last_name": lastname,
	      "email": emailaddress,
	      "is_staff": isstaff,
      }),
    });
  
    if (!response.ok) {  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? "Error trying to add a user";
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postUsers;