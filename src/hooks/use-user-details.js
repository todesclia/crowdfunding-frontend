import { useState, useEffect } from "react";
import getUserDetails from "../api/get-user-details";

export default function useUserDetails(projectId) {
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getUserDetails(userId)
      .then((user) => {
        setUserDetails(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [userId]);

  return { userDetails, isLoading, error };
}
