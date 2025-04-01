import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import "./styles.css";

const Login = () => {
  const { setUserType } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setUserType(response.data.userType);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Logout = () => {
  const { setUserType } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserType(null);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

const GradeManagement = () => {
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({ studentId: "", course: "", grade: "" });

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    const response = await axios.get("/api/grades");
    setGrades(response.data);
  };

  const handleAddGrade = async () => {
    await axios.post("/api/grades", newGrade);
    fetchGrades();
  };

  return (
    <div className="container">
      <h3>Grade Management</h3>
      <input type="text" placeholder="Student ID" onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })} />
      <input type="text" placeholder="Course" onChange={(e) => setNewGrade({ ...newGrade, course: e.target.value })} />
      <input type="number" placeholder="Grade" onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })} />
      <button onClick={handleAddGrade}>Add Grade</button>
      <ul>
        {grades.map((g) => (
          <li key={g.id}>{g.studentId} - {g.course}: {g.grade}</li>
        ))}
      </ul>
    </div>
  );
};

const ViewGrades = () => {
  const [grades, setGrades] = useState([]);
  useEffect(() => {
    axios.get("/api/student/grades").then((res) => setGrades(res.data));
  }, []);

  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, g) => sum + g.grade, 0);
    return (total / grades.length).toFixed(2);
  };

  return (
    <div className="container">
      <h3>My Grades</h3>
      <ul>
        {grades.map((g) => (
          <li key={g.id}>{g.course}: {g.grade}</li>
        ))}
      </ul>
      <h4>Average Grade: {calculateAverage()}</h4>
    </div>
  );
};

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    await axios.post("/api/reset-password", { email });
    setMessage("Check your email for a reset link");
  };

  return (
    <div className="container">
      <h3>Reset Password</h3>
      <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleReset}>Reset</button>
      <p>{message}</p>
    </div>
  );
};

const App = () => {
  const [userType, setUserType] = useState(null);

  return (
    <AuthContext.Provider value={{ userType, setUserType }}>
      <Router>
        <Routes>
          <Route path="/" element={!userType ? <Login /> : userType === "teacher" ? <Navigate to="/teacher" /> : <Navigate to="/student" />} />
          <Route path="/teacher" element={userType === "teacher" ? <GradeManagement /> : <Navigate to="/" />} />
          <Route path="/student" element={userType === "student" ? <ViewGrades /> : <Navigate to="/" />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
