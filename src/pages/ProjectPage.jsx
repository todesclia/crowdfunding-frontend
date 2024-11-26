import { oneProject } from "../data";

function ProjectPage() {
  return (
    <div>
      <h2>{oneProject.title}</h2>
      <h3>Created at: {oneProject.date_created}</h3>
      <h3>{`Status: ${oneProject.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {oneProject.pledges.sort((a, b) => a.date_created - b.date_created).map((pledgeData, key) => {
          return (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;
