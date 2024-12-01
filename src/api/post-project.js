async function postProject(projecttitle, projectdescription, projectgoal, projectimage) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const token = window.localStorage.getItem("token")


    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorizatiion": `Token ${token}`,
      },
      body: JSON.stringify({
        "title": projecttitle,
        "description": projectdescription,
        "goal": projectgoal,
        "image": projectimage,
        "is_open": true
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to add project`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postProject;