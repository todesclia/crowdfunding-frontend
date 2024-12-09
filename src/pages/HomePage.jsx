import useProjects from "../hooks/use-projects";
import ProjectCardsContainer from "../components/ProjectCardsContainer";
import "../components/RippleRise.css";

function HomePage() {
  const { projects } = useProjects();

  return (
    <div className="home">
        {projects.map((projectData, key) => {
          return <ProjectCardsContainer key={key} projectData={projectData} />;
        })}
    </div>
  );
}

export default HomePage;
