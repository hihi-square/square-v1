import React, { useEffect } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import MapLayer from "./component/MapLayer";
import Header from "./component/Header";
import Footer from "../Footer";

export default function Map() {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Grid container xs={12} direction="column" alignItems="center">
      <Header cateNum={0} setAni={null} />
      <Grid sx={{ height: "70px" }}></Grid>
      <Grid container xs={11} justifyContent="center">
        <MapLayer />
      </Grid>
      <Grid sx={{ height: "70px" }}></Grid>
      <Footer now={2} />
    </Grid>
  );
}
