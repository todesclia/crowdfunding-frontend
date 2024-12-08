async function postPledge(amount, comment, projectID, isanonymous) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const token = window.localStorage.getItem("token");
    const supporter = window.localStorage.getItem("userID");


    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "amount": amount,
        "comment": comment,
	      "anonymous": isanonymous,
	      "project": projectID,
      }),
      
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to add pledge`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postPledge;