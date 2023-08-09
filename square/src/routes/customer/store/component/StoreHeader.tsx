import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/redux";
import "App.css";
import "animate.css";
import { Unstable_Grid2 as Grid, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  setAni: React.Dispatch<React.SetStateAction<boolean>> | null;
  name: string;
}

export default function StoreHeader({ setAni, name }: Props) {
  const navigate = useNavigate();
  const sticky = useSelector((state: RootState) => state.sticky);

  const handleCartClick = () => {
    // 장바구니 ㄱㄱ
  };

  return (
    <Grid
      xs={12}
      container
      component="header"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        top: 0,
        position: ["sticky", "-webkit-sticky"],
        backgroundColor: sticky.store === 0 ? "transparent" : "white",
        zIndex: 5,
      }}
    >
      <Grid container xs={12} alignItems="center" sx={{ height: "60px" }}>
        <Grid xs={2}>
          <IconButton
            onClick={() => {
              if (setAni) setAni(true);
              setTimeout(() => {
                navigate(-1);
              }, 100);
            }}
            sx={{ fontSize: "20px" }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ color: "#000000" }}
            />
          </IconButton>
        </Grid>
        <Grid xs={8}>
          {sticky.store === 0 ? null : (
            <Typography
              variant="h5"
              component="h5"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              {name}
            </Typography>
          )}
        </Grid>
        <Grid
          xs
          container
          flexGrow={1}
          justifyContent="right"
          sx={{ marginRight: "15px" }}
        >
          <Grid>
            <IconButton onClick={handleCartClick} sx={{ fontSize: "20px" }}>
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ color: "#000000" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
