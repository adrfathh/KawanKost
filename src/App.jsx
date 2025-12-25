import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/Admin.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/register/Login.jsx";
import SignUp from "./pages/register/SignUp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Admin />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;