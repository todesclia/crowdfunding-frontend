import useProjectDetails from "../hooks/use-project-details";
import { useParams } from "react-router-dom";
import "../components/RippleRise.css"
import PledgesContainer from "../components/PledgesContainer";

function PledgesPage() {
  const { id } = useParams();
  const { projectDetails, isLoading, error } = useProjectDetails(id);
  
  if (isLoading || projectDetails == null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div>
        <PledgesContainer projectData={projectDetails} />
    </div>
  );
};

export default PledgesPage;