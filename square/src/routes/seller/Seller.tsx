import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/Signup";
import Dashboard from "./dashboard/Dashboard";

export default function Seller() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}
