import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import Spinner from "../../components/Spinner/Spinner";

// styles
import "./Create.css";

export default function Create() {
  const { addDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();

  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const [isPending, setIspending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      setFormError(null);
      setFormError("Please select a project category");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError(null);
      setFormError("Please assign at least one user to this project");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      comments: [],
      createdBy,
      assignedUsers: assignedUsersList,
    };

    if (!response.error) {
      setIspending(true);
      await addDocument(project);
      setIspending(false);
      navigate("/");
    }
  };

  const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
  ];

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });

      setUsers(options);
    }
  }, [documents]);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set Due Date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        {isPending && (
          <button className="btn" disabled>
            <Spinner />
          </button>
        )}
        {!isPending && <button className="btn">Create Project</button>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
