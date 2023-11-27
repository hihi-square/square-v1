import React from "react";
import { useNavigate } from "react-router-dom";
import "App.css";
import { Unstable_Grid2 as Grid, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/deal/cart");
  };

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
      <Grid xs={2} container justifyContent="center"></Grid>
      <Grid xs={8} container justifyContent="center">
        <Typography
          variant="h5"
          component="h5"
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          마이페이지
        </Typography>
      </Grid>
      <Grid xs={2} container justifyContent="center">
        <IconButton onClick={handleCartClick}>
          <FontAwesomeIcon
            icon={faShoppingCart}
            style={{ color: "#000000" }}
            size="1x"
          />
        </IconButton>
      </Grid>
    </Grid>
  );
}
