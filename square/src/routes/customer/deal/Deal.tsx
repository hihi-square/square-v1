import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPage } from "redux/redux";
import Header from "./component/Header";
import Cart from "./component/Cart";
import Pay from "./component/Pay";

export default function My() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("메인"));
  }, [dispatch]);

  return (
    <Grid container xs={12} direction="column">
      <Header />
      <Grid sx={{ height: "70px" }}></Grid>
      <Grid container xs={12} justifyContent="center">
        <Routes>
          <Route path="cart" element={<Cart />} />
          <Route path="pay" element={<Pay />} />
        </Routes>
      </Grid>
      <Grid sx={{ height: "70px" }}></Grid>
    </Grid>
  );
}
