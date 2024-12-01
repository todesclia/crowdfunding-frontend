import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;
  const baseUrl = import.meta.env.VITE_API_URL;  // Set your base URL here

  const imageUrl = `${projectData.image}`; 


  return (
    <div className="project-card">
      <Link to="/project">
        <img src={imageUrl} alt={projectData.title} />
        <h3>{projectData.title}</h3>
      </Link>
    </div>
  );
}

export default ProjectCard;
