import useProjectDetails from "../hooks/use-project-details";
import { useParams } from "react-router-dom";
import AddPledgeForm from "../components/AddPledgeForm";

function ProjectPage() {
  const { id } = useParams();
  const { projectDetails, isLoading, error } = useProjectDetails(id);
  
  if (isLoading || projectDetails == null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div id="project-details">
      <AddPledgeForm projectData={projectDetails} />
    </div>
  );
};

export default ProjectPage;
