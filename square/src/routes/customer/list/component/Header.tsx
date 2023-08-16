import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "App.css";
import "animate.css";
import { Unstable_Grid2 as Grid, Typography, IconButton } from "@mui/material";
import { BiCartAlt, BiArrowBack } from "react-icons/bi";

export default function Header() {
  const { query } = useParams<{ query?: string }>();
  const [name, setName] = useState<string>(query || "");
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate("/deal/cart");
  };
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    switch (query) {
      case "1":
        setName("커피/음료");
        break;
      case "2":
        setName("베이커리");
        break;

      case "3":
        setName("조리식품");
        break;
      case "4":
        setName("신선식품");
        break;

      default:
        break;
    }
  }, [query]);

  return (
    <Grid
      container
      xs={12}
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        height: "60px",
        width: "100%",
        maxWidth: "600px",
        zIndex: 3,
        backgroundColor: "white",
      }}
    >
      <Grid xs={2}>
        <IconButton onClick={goBack}>
          <BiArrowBack size="24" color="#3d3d3d" />
        </IconButton>
      </Grid>
      <Grid xs>
        <Typography
          variant="h5"
          sx={{
            color: "black",
            fontWeight: 600,
            margin: "auto",
            width: "100%",
            textAlign: "center",
          }}
        >
          {name}
        </Typography>
      </Grid>
      <Grid
        xs={2}
        container
        justifyContent="right"
        sx={{ marginRight: "15px" }}
      >
        <Grid>
          <IconButton onClick={handleCartClick}>
            <BiCartAlt size="28" color="#3d3d3d" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
