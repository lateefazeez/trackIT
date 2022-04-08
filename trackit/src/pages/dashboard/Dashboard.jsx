import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";

import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Dashboard.css";

const Dashboard = () => {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsers.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "development":
          case "design":
          case "marketing":
          case "sales":
            console.log(document.category, currentFilter);
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <>
      <h2>Dashboard</h2>
      <ProjectFilter
        currentFilter={currentFilter}
        changeFilter={changeFilter}
      />
      {error && <p>{error}</p>}
      {projects && <ProjectList projects={projects} />}
    </>
  );
};

export default Dashboard;
