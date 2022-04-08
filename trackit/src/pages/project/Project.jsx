import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import Spinner from "../../components/Spinner/Spinner";

// styles
import "./Project.css";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return (
      <div className="loading">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} id={id} />
      <ProjectComments project={document} id={id} />
    </div>
  );
};

export default Project;
