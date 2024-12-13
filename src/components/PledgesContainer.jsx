import "./RippleRise.css";

function PledgesContainer(props) {
    const { projectData } = props;
    const pledges = projectData.pledges;

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
                        {" "}{pledge.anonymous ? "Anonymous" : pledge.supporter}
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
