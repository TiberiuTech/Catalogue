import React, { useState } from "react";

function TeacherDashboard() {
  const [grades, setGrades] = useState([
    { id: 1, student: "John Doe", grade: 85 },
    { id: 2, student: "Jane Smith", grade: 90 },
  ]);

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <ul>
        {grades.map((g) => (
          <li key={g.id}>{g.student}: {g.grade}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;
