import Avatar from "../../components/Avatar/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProjectSummary({ project, id }) {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDocument(id);
    navigate("/");
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="project-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project Due By {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsers.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {/* {user.uid == project.createdBy.id && ( */}
      <button className="btn" onClick={handleDelete}>
        Mark as Complete
      </button>
      {/* )} */}
    </div>
  );
}
