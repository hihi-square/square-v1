import React, { useEffect } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPage } from "redux/redux";
import MapLayer from "./component/MapLayer";
import Header from "../Header";
import Footer from "../Footer";

export default function Map() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("지도"));
  }, [dispatch]);

  return (
    <Grid container xs={12} direction="column">
      <Header cateNum={0} setAni={null} />
      <Grid container xs={12} justifyContent="center">
        <MapLayer />
      </Grid>
      <Grid container xs={12} justifyContent="center">
        <Footer now={2} />
      </Grid>
    </Grid>
  );
}
