import { useState } from "react";
import postPledge from "../api/post-pledge.js";
import { useNavigate } from "react-router-dom";
 
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const pledgeSchema = z.object({
      amount: z.coerce.string().regex(/^\d+$/, { message: "Amount must be a positive integer" }),
      comment: z.string().optional(),
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
      if (isSubmitting) return;
      setIsSubmitting(true);
      const result = pledgeSchema.safeParse(pledgeDetails);

      try {
        // Post the pledge data to the server
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
      } finally {
        setIsSubmitting(false); // Reset the form submission state
      }
    };

    return (
      <div className="form-container">
        <form id="pledgeForm" onSubmit={handleSubmit} className="form">
          <div>
            <label htmlFor="amount">Enter your donation</label>
            <input type="number" id="amount" onChange={handleChange} placeholder="$" />
          </div>
          <div>
            <label htmlFor="comment">Add a message (optional)</label>
            <input type="text" id="comment" onChange={handleChange} />
          </div>
          <div className = "checkbox-container">
            <label htmlFor="isanonymous" style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'flex-start'}} >
              <input type="checkbox" id="isanonymous" onChange={handleChange} />&nbsp;&nbsp;&nbsp;Don't display my name publicly
            </label>
          </div>
          <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add"} 
          </button>
        </form>
      </div>
    );
  };

  export default AddPledgeForm;