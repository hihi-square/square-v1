import React, { useEffect } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPage } from "redux/store";
import Category from "./component/Category";
import Feed from "./component/Feed";
import Header from "../Header";
import Footer from "../Footer";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("메인"));
  }, [dispatch]);

  return (
    <>
      <Grid container xs={12} direction="column">
        <Header cateNum={0} setAni={null} />
        <Grid container xs={12} justifyContent="center">
          <Category />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <Feed />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

export default MainPage;
