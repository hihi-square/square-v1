import React from "react";
import "animate.css";
import { Unstable_Grid2 as Grid } from "@mui/material";

import CategoryStore from "./component/CategoryStore";
import Header from "./component/Header";
import Footer from "../Footer";

export default function List() {
  return (
    <Grid
      container
      xs={12}
      direction="column"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Header />
      <Grid xs={12} sx={{ height: "60px" }}></Grid>
      <Grid container xs={12} justifyContent="center">
        <CategoryStore />
      </Grid>
      <Grid xs={12} sx={{ height: "80px" }}></Grid>
      <Footer now={2} />
    </Grid>
  );
}
