import { useState } from "react";
import postProject from "../api/post-project.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import { z } from "zod";


function AddProjectForm() {
    const navigate = useNavigate();
    // const {auth, setAuth} = useAuth();

    const [projectDetails, setProjectDetails] = useState({
        projecttitle: "",
        projectdescription: "",
        projectgoal: "",
        projectimage: null,
    });

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
        const error = result.error.errors?.[0]?.message || "Validation failed";
        if (error) {
          alert(error.message);
        }
        return;
      }
      try {
        const formData = new FormData();
        formData.append("title", result.data.projecttitle);
        formData.append("description", result.data.projectdescription);
        formData.append("goal", parseInt(result.data.projectgoal, 10));
        formData.append("is_open", 1);
        formData.append("owner", 34);
        if (result.data.projectimage) {
          formData.append("image", result.data.projectimage);
        }
        console.log("FormData entries:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        await postProject(formData);
        navigate("/");
      } catch (error) {
        alert(error.message);
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
          <label htmlFor="projectimage">Upload Project Image:</label>
          <input type="file" accept="image/*" id="projectimage" onChange={handleChange} />
        </div>
        <button type="submit" className="btn">Add</button>
      </form>
    );
  }

  export default AddProjectForm;