import { useState, useEffect } from "react";
import getUserDetails from "../api/get-user-details";

export default function useUserDetails(pledges)  {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userMap = {};
      const promises = pledges.map(async (pledge) => {
        if (pledge.supporter && !userMap[pledge.supporter]) {
          try {
            const user = await getUserDetails(pledge.supporter);
            userMap[pledge.supporter] = `${user.first_name} ${user.last_name}`;
          } catch (error) {
            console.error(`Error fetching user details from pledge`, error);
          }
        }
      });
      await Promise.all(promises);
      setUserDetails(userMap);
      setIsLoading(false);
    };

    if (pledges.length > 0) {
      fetchUserDetails();
    }
  }, [pledges]);

  return { userDetails, isLoading };
};

