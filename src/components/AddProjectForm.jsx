import { useState } from "react";
import postProject from "../api/post-project.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import { z } from "zod";


function AddProjectForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [projectDetails, setProjectDetails] = useState({
        projecttitle: "",
        projectdescription: "",
        projectgoal: "",
        projectimage: "",
    });

    const projectSchema = z.object({
      projecttitle: z.string().min(1, { message: "Title must not be empty" }),
      projectgoal: z.string().regex(/^\d+$/, { message: "Goal must be a positive integer" }),
      projectdescription: z.string().min(1, { message: "Description must not be empty" }),
      projectimage: z.string().url({ message: "Image must be a valid URL" }),
    });  

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProjectDetails((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
       event.preventDefault();

       const result = projectSchema.safeParse(projectDetails);
       if (!result.success) {
        const error = result.error.errors?.[0];
        if (error) {
          alert(error.message);
        }
        return;
      }
      try {
        const response = await postProject(
          result.data.projecttitle,
          result.data.projectdescription,
          parseInt(result.data.projectgoal, 10),
          result.data.projectimage
        );
        navigate("/");
      } catch (error) {
        alert(error.message); // Handle error feedback
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projecttitle">Project Title:</label>
          <input type="text" id="projecttitle" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="projectdescription">Enter Project Description:</label>
          <input type="text" id="projectdescription" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="projectgoal">Enter Project Goal:</label>
          <input type="number" id="projectgoal" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="projectimage">Enter Project Image:</label>
          <input type="text" id="projectimage" onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }

  export default AddProjectForm;