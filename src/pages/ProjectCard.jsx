
import { Link } from "react-router-dom";

import "../components/RippleRise.css";

function ProjectCard(props) {
  const { projectData } = props;
  console.log(projectData);
  const projectLink = `project/${projectData.id}`;
  const imageUrl = `${projectData.image}`;

  return (
    <div className="card-details">
      <img src={imageUrl} alt={projectData.title} />
      <h3>{projectData.title}</h3>
      <p>{projectData.description}</p>
      <p>{projectData.goal}</p>
    </div>
  );
}

export default ProjectCard;
