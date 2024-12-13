import useProjectDetails from "../hooks/use-project-details";
import { useParams } from "react-router-dom";
import AddPledgeForm from "../components/AddPledgeForm";
import ProjectCard from "../components/ProjectCard";
import PledgesContainer from "../components/PledgesContainer";
import useAuth from "../hooks/use-auth.js";
import "../components/RippleRise.css"

function ProjectPage() {
  const { id } = useParams();
  const {auth} = useAuth();
  const { projectDetails, isLoading, error } = useProjectDetails(id);
  
  if (isLoading || projectDetails == null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div className="project-details">
        <ProjectCard projectData={projectDetails} />
        <PledgesContainer projectData={projectDetails} />
        {auth.token ? (
        <AddPledgeForm projectData={projectDetails} />
        ) : (
          <div className="card-details">Please log in to make a pledge</div>
        )}
    </div>
  );
};

export default ProjectPage;