import React, { useEffect } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPage } from "redux/redux";

import List from "./component/OrderList";
import Header from "./component/Header";
import Footer from "../Footer";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("주문"));
  }, [dispatch]);

  return (
    <Grid container xs={12} direction="column" alignItems="center">
      <Header />
      <Grid sx={{ height: "70px" }}></Grid>
      <Grid container xs={10} justifyContent="center">
        <List />
      </Grid>
      <Grid sx={{ height: "70px" }}></Grid>
      <Footer now={4} />
    </Grid>
  );
}

export default MainPage;
