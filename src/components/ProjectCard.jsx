import useAuth from "../hooks/use-auth.js";
import "../components/RippleRise.css";

function ProjectCard(props) {
  const {auth} = useAuth();
  const { projectData } = props;
  const imageUrl = `${projectData.image}`;

  return (
    <div className="card-details">
      <h3>{projectData.title}</h3>
      <img src={imageUrl} alt={projectData.title} />
      <p>{projectData.description}</p>
      <p>Target &nbsp; $ {projectData.goal}</p>
      {auth.token ? (
        <a className="home-page-btn" href="#pledgeForm">Make a Pledge</a>
      ) : (
        <a className="home-page-btn" href="/login">Please login to make a pledge</a>
      )}
    </div>
  );
}

export default ProjectCard;
