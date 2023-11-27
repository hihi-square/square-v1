import React, { useEffect } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPage } from "redux/redux";
import MyPage from "./component/MyPage";
import Header from "./component/Header";
import Footer from "../Footer";

export default function My() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("메인"));
  }, [dispatch]);

  return (
    <Grid container xs={12} direction="column">
      <Header />
      <Grid sx={{ paddingTop: "40px" }}></Grid>
      <Grid container xs={12} justifyContent="center">
        <MyPage />
      </Grid>
      <Grid sx={{ height: "70px" }}></Grid>
      <Footer now={5} />
    </Grid>
  );
}
