import React, { useState } from "react";

import "./Dashboard.css";

export default function ({ currentFilter, changeFilter }) {
  const projectList = [
    "all",
    "mine",
    "development",
    "design",
    "sales",
    "marketing",
  ];

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {projectList.map((f) => (
          <button
            key={f}
            onClick={() => changeFilter(f)}
            className={currentFilter == f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
