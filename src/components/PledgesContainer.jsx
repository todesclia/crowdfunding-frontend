import { useState } from "react";
import deletePledge from "../api/delete-pledge";
import useUserDetails from "../hooks/use-user-details.js";

import "./RippleRise.css";

function PledgesContainer(props) {
    const { projectData } = props;
    const [pledges, setPledges] = useState(projectData.pledges);
    const currentUserId = window.localStorage.getItem("userID");
    const { userDetails, loadingUsers } = useUserDetails(pledges);

    const handleDelete = async (pledgeID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this pledge?");
        if (!confirmDelete) return;

        try {
            await deletePledge(pledgeID);
            alert("Pledge deleted successfully!");

            setPledges((prevPledges) =>
                prevPledges.filter((pledge) => pledge.id !== pledgeID)
            );
        } catch (error) {
            console.error("Error deleting pledge:", error);
            alert("Failed to delete the pledge.");
        }
    };

    if (loadingUsers && pledges.length > 0) {
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
                        {pledge.anonymous ? "Anonymous" : userDetails[pledge.supporter] || "Unknown"}
                        </p>
                        <div>
                            {String(pledge.supporter) === currentUserId && (
                                <button className="btn"
                                    onClick={() => handleDelete(pledge.id)}>
                                Delete Pledge
                                </button>
                            )}
                        </div>
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
