import React from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Board from "./Board";
import Header from "./Header";
import Footer from "../../Footer";
import BoardForm from "./BoardForm";
import BoardDetail from "./BoardDetail";

function MainPage() {
  return (
    <Grid
      container
      xs={12}
      sx={{
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      {/* <Grid xs={12} sx={{ height: "60px" }}></Grid> */}
      <Grid container xs={12} justifyContent="center">
        <Routes>
          <Route path="*" element={<Board />} />
          <Route path="write" element={<BoardForm mode="write" />} />
          <Route path="update/:id" element={<BoardForm mode="update" />} />
          <Route path=":id" element={<BoardDetail />} />
        </Routes>
      </Grid>
      <Grid xs={12} sx={{ height: "80px" }}></Grid>
      <Footer now={3} />
    </Grid>
  );
}

export default MainPage;
