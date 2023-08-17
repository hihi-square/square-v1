import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";
import Main from "./Seller";

export default function Seller() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}
