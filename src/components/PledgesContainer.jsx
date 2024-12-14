import { useState, useEffect } from "react";
import getUserDetails from "../api/get-user-details";

import "./RippleRise.css";

function PledgesContainer(props) {
    const { projectData } = props;
    const pledges = projectData.pledges;

    const [userDetails, setUserDetails] = useState({});
    const [loadingUsers, setLoadingUsers] = useState(true);

    const fetchUserDetailsSync = async () => {
        const userMap = {};

        for (const pledge of pledges) {
            if (pledge.supporter && !userDetails[pledge.supporter]) {
                try {
                    const user = await getUserDetails(pledge.supporter);
                    userMap[pledge.supporter] = `${user.first_name} ${user.last_name}`;
                } catch (error) {
                    console.error(`Error fetching user details for ${pledge.supporter}:`, error);
                }
            }
        }

        // Update state synchronously after all fetches
        setUserDetails((prevState) => ({
            ...prevState,
            ...userMap,
        }));
        setLoadingUsers(false);
    };

    // Synchronously call the fetch logic before rendering
    if (loadingUsers && pledges.length > 0) {
        fetchUserDetailsSync();
        return <div>Loading user details...</div>;
    }

    return (
        <div className="card-details">
            {pledges.length > 0 ? ( 
            <>
                <h1>Pledges</h1>
                <ul>
                    {pledges.map((pledge) => (
                    <li key={pledge.id}>
                        <p>Amount ${pledge.amount}<br></br>
                        {pledge.comment}<br></br>
                        {loadingUsers ? (
                                        "Loading..."
                                    ) : pledge.anonymous ? (
                                        "Anonymous"
                                    ) : userDetails[pledge.supporter] || 
                                        "Unknown"
                                    }</p>
                        <p>&nbsp;</p>
                    </li>
                    ))}
                </ul>
            </>
            ) : (
                <h3>Be the first to make a Pledge!</h3>
            )}
        </div>
    );
};

export default PledgesContainer;
