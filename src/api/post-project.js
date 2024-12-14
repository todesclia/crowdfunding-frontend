async function postProject(formData) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const token = window.localStorage.getItem("token")

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`
      },
      body: formData,
      
    });
  
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const errorMessage = data?.detail || "Failed to add project. Please check your inputs and try again.";
      throw new Error(errorMessage);
    }
  
    return await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Unexpected response from the server. Please try again later.");
    } else {
      throw error; // Propagate the error for the caller to handle
    }
  }
}
  
  export default postProject;