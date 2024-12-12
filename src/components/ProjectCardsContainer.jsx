import { Link } from "react-router-dom";
import "./RippleRise.css";

function ProjectCardsContainer(props) {
    const { projectData } = props;
    const projectLink = `../project/${projectData.id}`;
    const imageUrl = `${projectData.image}`;
    return (
        <div className="cards">
            <Link to={projectLink}>
                <h3>{projectData.title}</h3>
                <img src={imageUrl} alt={projectData.title} />
            </Link>
            <p>{projectData.description}</p>
            <p>$ {projectData.goal}</p>
        </div>
    );
};

export default ProjectCardsContainer;
