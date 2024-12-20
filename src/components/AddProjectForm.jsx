import { useState } from "react";
import postProject from "../api/post-project.js";
import { useNavigate } from "react-router-dom";
import { z } from "zod";


function AddProjectForm() {
    const navigate = useNavigate();
    const userID = window.localStorage.getItem("userID")

    const [projectDetails, setProjectDetails] = useState({
        projecttitle: "",
        projectdescription: "",
        projectgoal: "",
        projectimage: null,
    });
    const [error, setError] = useState('');

    const projectSchema = z.object({
      projecttitle: z.string().min(1, { message: "Title must not be empty" }),
      projectgoal: z.string().regex(/^\d+$/, { message: "Goal must be a positive integer" }),
      projectdescription: z.string().min(1, { message: "Description must not be empty" }),
      projectimage: z.instanceof(File).optional(),
    });  

    const handleChange = (event) => {
        const { id, value, type, files } = event.target;
        if (type === "file") {
          setProjectDetails((prevProject) => ({
            ...prevProject,
            [id]: files[0],
          }));
        } else {
          setProjectDetails((prevProject) => ({
              ...prevProject,
              [id]: value,
          }));
        }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      const result = projectSchema.safeParse(projectDetails);
      if (!result.success) {
        const error = result.error.errors?.[0];
        if (error) {
          setError(error.message);
        }
        return;
      }
      
      try {
        const formData = new FormData();
        formData.append("title", result.data.projecttitle);
        formData.append("description", result.data.projectdescription);
        formData.append("goal", parseInt(result.data.projectgoal, 10));
        formData.append("is_open", 1);
        formData.append("owner", userID);
        if (result.data.projectimage) {
          formData.append("image", result.data.projectimage);
        }
       
        await postProject(formData);
        navigate("/");
      } catch (error) {
        alert("Failed to add project. Please try again later.");
      }
    };

    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form" >
          {error && <div className="error-popup">{error}</div>}
          <div>
            <label htmlFor="projecttitle">Give your fundraiser a title</label>
            <input type="text" id="projecttitle" onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="projectdescription">Provide your fundraising reasons and describe how the funds will be used</label>
            <textarea id="projectdescription" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="projectgoal">Enter your inital target $</label>
            <input type="number" id="projectgoal" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="projectimage">Add a cover image</label>
            <input type="file" accept="image/*" id="projectimage" onChange={handleChange} />
          </div>
          <button type="submit" className="btn">Add</button>
        </form>
      </div>
    );
  }

  export default AddProjectForm;