import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {!isLoggedIn && <Route path="/login" element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />} />}
      </Routes>
    </Router>
  );
};

export default App;
