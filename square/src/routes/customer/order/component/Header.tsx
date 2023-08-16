import React from "react";
import "App.css";
import { Unstable_Grid2 as Grid, Typography } from "@mui/material";

export default function Header() {
  return (
    <Grid
      container
      xs={12}
      alignItems="center"
      sx={{
        position: "fixed",
        backgroundColor: "white",
        maxWidth: 600,
        top: 0,
        height: "60px",
      }}
    >
      <Grid xs={12} container justifyContent="center">
        <Typography
          variant="h5"
          component="h5"
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          주문
        </Typography>
      </Grid>
    </Grid>
  );
}
