async function deletePledge(pledgeID) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeID}/`;
    const token = window.localStorage.getItem("token");
    const supporter = window.localStorage.getItem("userID");


    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${token}`,
      },
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to delete pledge`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return { success: true };
  }
  
  export default deletePledge;