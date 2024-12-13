async function getUserDetails(userId) {
  const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
  const token = window.localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || `Error fetching user with id ${userId}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
}

export default getUserDetails;
