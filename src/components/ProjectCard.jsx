import "../components/RippleRise.css";

function ProjectCard(props) {
  const { projectData } = props;
  const imageUrl = `${projectData.image}`;

  return (
    <div className="card-details">
      <h3>{projectData.title}</h3>
      <img src={imageUrl} alt={projectData.title} />
      <p>{projectData.description}</p>
      <p>Target &nbsp; $ {projectData.goal}</p>
      <a className="home-page-btn" href="#pledgeForm">Make a Pledge</a>
    </div>
  );
}

export default ProjectCard;
