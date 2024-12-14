import useProjects from "../hooks/use-projects";
import ProjectCardsContainer from "../components/ProjectCardsContainer";
import useAuth from "../hooks/use-auth.js";
import "../components/RippleRise.css";

function HomePage() {
  const { projects } = useProjects();
  const {auth} = useAuth();

  return (
    <div>
      <div className="home-page">
        <div className="home-page-content">
          <h1>Ripple Rise</h1>
          <h2>Community driven fundraising programs</h2>
          {auth.token ? (
           <a className="home-page-btn" href="/addproject">Create a project</a>
          ) : (
            <a className="home-page-btn" href="/login">Please login to add a project</a>
          )}
        </div> 
      </div>   
      <div className="project-list">
          {projects.map((projectData, key) => {
            return <ProjectCardsContainer key={key} projectData={projectData} />;
          })}
      </div>
    </div>
  );
}

export default HomePage;
