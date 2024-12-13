import { useState, useEffect } from "react";
import getProjectDetails from "../api/get-project-details";

export default function useProjectDetails(projectId) {
  const [projectDetails, setProjectDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getProjectDetails(projectId)
      .then((project) => {
        setProjectDetails(project);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [projectId]);

  return { projectDetails, isLoading, error };
}
