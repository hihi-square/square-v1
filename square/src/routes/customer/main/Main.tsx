import React, { useEffect } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPage } from "redux/redux";

import Search from "./component/Search";
import Header from "../Header";
import Footer from "../Footer";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("메인"));
  }, [dispatch]);

  return (
    <Grid container xs={12} direction="column">
      <Header cateNum={0} setAni={null} />
      <Grid sx={{ height: "70px" }}></Grid>
      <Grid container xs={12} justifyContent="center">
        <Search />
      </Grid>
      <Grid sx={{ height: "70px" }}></Grid>
      <Footer now={2} />
    </Grid>
  );
}

export default MainPage;
