import { Link } from "react-router-dom";
import "./RippleRise.css";

function ProjectCardsContainer({ projectData }) {
    return (
        <div className="cards" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%'
        }}>
            <a href={`/project/${projectData.id}`} style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h3>{projectData.title}</h3>
                <img 
                    src={projectData.image} 
                    alt={projectData.title}
                    style={{
                        maxWidth: '100%',
                        height: 'auto'
                    }}
                />
            </a>
            <p>{projectData.description}</p>
            <p>$ {projectData.goal}</p>
        </div>
    );
}

export default ProjectCardsContainer;
