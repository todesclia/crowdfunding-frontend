import { Link } from "react-router-dom";

import "./RippleRise.css";

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
      <p>{projectData.description}</p>
      <p>{projectData.goal}</p>
      <p>{projectData.pledges}</p>
    </div>
  );
}

export default ProjectCard;
