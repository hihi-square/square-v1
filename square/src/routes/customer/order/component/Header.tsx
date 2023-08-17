import React from "react";
import "App.css";
import { Unstable_Grid2 as Grid, Typography } from "@mui/material";

export default function Header() {
  return (
    <Grid>
      <Grid xs={12} container justifyContent="center">
        <Typography
          variant="h6"
          align="center"
          style={{
            marginBottom: "5px",
            position: "fixed",
            backgroundColor: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "70px",
            zIndex: "4",
          }}
        >
          주문 내역
        </Typography>
      </Grid>
    </Grid>
  );
}
