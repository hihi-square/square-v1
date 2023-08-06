import React, { useState, useEffect } from "react";
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
  const [animation, setAnimation] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("가게 목록"));
  }, [dispatch, category]);

  return (
    <Grid
      container
      xs={12}
      direction="column"
      className={`animate__animated 
      ${animation ? "animate__slideOutRight" : "animate__slideInRight"}`}
      sx={{
        backgroundColor: "white",
        zIndex: "2",
        "--animate-duration": "200ms",
      }}
    >
      <Header cateNum={Number(category)} setAni={setAnimation} />
      <Grid container xs={12} justifyContent="center">
        <CategoryStore />
      </Grid>
      <Grid container xs={12} justifyContent="center">
        <Footer />
      </Grid>
    </Grid>
  );
}
