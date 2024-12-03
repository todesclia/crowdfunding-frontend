import useProjectDetails from "../hooks/use-project-details";
import { useParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function ProjectPage() {
  const { id } = useParams();
  const { projectDetails, isLoading, error } = useProjectDetails(id);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (!projectDetails || projectDetails.length === 0) {
    return <div>No project details found.</div>; 
  }

  return (
    <div id="project-details">
      {projectDetails.map((projectData, key) => {
        return <ProjectCard key={key} projectData={projectData} />;
      })}
    </div>
  );
};

export default ProjectPage;
