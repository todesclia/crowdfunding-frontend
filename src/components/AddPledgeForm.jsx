import { useState } from "react";
import postPledge from "../api/post-pledge.js"; 
import { z } from "zod";

function AddPledgeForm({projectData}) {

    const projectID = projectData.id;  
    const userID = projectData.owner;

    const [pledgeDetails, setPledgeDetails] = useState({
        amount: "",
        comment: "",
        isanonymous: false,
        projectID: projectID,
        supporter: userID,
    });
    const [error, setError] = useState('');

    const pledgeSchema = z.object({
      amount: z.coerce.string().regex(/^\d+$/, { message: "Amount must be a positive integer" }),
      comment: z.string().min(1, { message: "Comment must not be empty " }),
      projectID: z.number().optional(),
      isanonymous: z.boolean().optional(),
    });  

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setPledgeDetails((prevPledge) => ({
          ...prevPledge,
          [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
     
      const result = pledgeSchema.safeParse(pledgeDetails);
      if (!result.success) {
        const error = result.error.errors?.[0];
        if (error) {
          setError(error.message);
        }
        return;
      }

      try {
        const response = await postPledge(
          result.data.amount,
          result.data.comment,
          result.data.projectID,
          result.data.isanonymous
        );
        window.location.reload();
      } catch (error) {
        console.error("Error submitting pledge:", error);
        alert("There was an error processing your pledge.");
      }
    };

    return (
      <div className="form-container">
        <form id="pledgeForm" onSubmit={handleSubmit} className="form">
          {error && <div className="error-popup">{error}</div>}
          <div>
            <label htmlFor="amount">Enter your donation</label>
            <input type="number" id="amount" onChange={handleChange} placeholder="$" />
          </div>
          <div>
            <label htmlFor="comment">Add a message</label>
            <input type="text" id="comment" onChange={handleChange} />
          </div>
          <div className = "checkbox-container">
            <label htmlFor="isanonymous" style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'flex-start'}} >
              <input type="checkbox" id="isanonymous" onChange={handleChange} />&nbsp;&nbsp;&nbsp;Don't display my name publicly
            </label>
          </div>
          <button type="submit" className="btn">Add
          </button>
        </form>
      </div>
    );
  };

  export default AddPledgeForm;