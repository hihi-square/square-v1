import React, { useEffect } from "react";
import "animate.css";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPage } from "redux/store";
import { useParams } from "react-router-dom";
import CategoryStore from "./component/CategoryStore";
import Header from "../Header";
import Footer from "../Footer";

export default function List() {
  const { category } = useParams<{ category?: string }>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("가게 목록"));
  }, [dispatch, category]);

  return (
    <Grid
      container
      xs={12}
      direction="column"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Header cateNum={Number(category)} setAni={null} />
      <Grid container xs={12} justifyContent="center">
        <CategoryStore />
      </Grid>
      <Grid container xs={12} justifyContent="center">
        <Footer />
      </Grid>
    </Grid>
  );
}
