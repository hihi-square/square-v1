/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MapLayer from "./component/MapLayer";
import Header from "./component/Header";
import Footer from "../Footer";

export default function Map() {
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  return (
    <Grid
      container
      xs={12}
      sx={{
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      <Grid sx={{ height: "60px" }}></Grid>
      <Grid container xs={12} justifyContent="center">
        <MapLayer />
      </Grid>
      <Grid sx={{ height: "80px" }}></Grid>
      <Footer now={1} />
    </Grid>
  );
}
