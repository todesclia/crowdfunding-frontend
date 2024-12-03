import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;
  const projectLink = `project/${projectData.id}`;
  const imageUrl = `${projectData.image}`; 

  return (
    <div className="project-card">
      <Link to={projectLink}>
        <img src={imageUrl} alt={projectData.title} />
        <h3>{projectData.title}</h3>
      </Link>
    </div>
  );
}

export default ProjectCard;
