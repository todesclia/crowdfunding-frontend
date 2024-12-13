import { useState, useEffect } from "react";
import getUserDetails from "../api/get-user-details";

import "./RippleRise.css";

function PledgesContainer(props) {
    const { projectData } = props;
    const pledges = projectData.pledges;

    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        const fetchUserDetails = async () => {
            const userPromises = pledges
                .filter((pledge) => pledge.supporter && !userDetails[pledge.supporter]) // Filter pledges with supporters not yet fetched
                .map((pledge) => getUserDetails(pledge.supporter)); // Create an array of promises

            try {
                // Wait for all user data to be fetched
                const users = await Promise.all(userPromises);

                // Update userDetails state with all fetched user data
                const userMap = users.reduce((acc, user) => {
                    acc[user.id] = `${user.first_name} ${user.last_name}`;
                    console.log(user.first_name);
                    return acc;
                }, {});

                setUserDetails((prevState) => ({
                    ...prevState,
                    ...userMap,
                }));
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (pledges.length > 0) {
            fetchUserDetails();
        }
    }, [pledges]);

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
                        {" "}{pledge.anonymous ? "Anonymous" : userDetails[pledge.supporter] || pledge.supporter}
                        </p>
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
