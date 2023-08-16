import React from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";

import Search from "./component/Search";
import Header from "./component/Header";
import Footer from "../Footer";

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
      <Grid xs={12} sx={{ height: "60px" }}></Grid>
      <Grid container xs={12} justifyContent="center">
        <Search />
      </Grid>
      <Grid xs={12} sx={{ height: "80px" }}></Grid>
      <Footer now={2} />
    </Grid>
  );
}

export default MainPage;
