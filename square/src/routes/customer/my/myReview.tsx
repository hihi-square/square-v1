import React from "react";
import { Route, Routes } from "react-router-dom";
import StorePage from "../store/storePage";

function MyReview() {
  return (
    <Routes>
      <Route path="/store/:storeId" element={<StorePage />} />
    </Routes>
  );
}

export default MyReview;
