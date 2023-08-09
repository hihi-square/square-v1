import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "App.css";
import "animate.css";
import {
  Unstable_Grid2 as Grid,
  Select,
  Box,
  Typography,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface Props {
  cateNum: Number;
  setAni: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export default function Header({ cateNum, setAni }: Props) {
  const navigate = useNavigate();
  const [location, setLocation] = useState("loc1");
  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };
  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <Grid
      container
      xs={12}
      alignItems="center"
      sx={{
        backgroundColor: "white",
        position: "fixed",
        top: 0,
        height: "60px",
        width: "100%",
        maxWidth: "600px",
        zIndex: 3,
      }}
    >
      <Grid xs>
        <Button sx={{ paddingLeft: "0px" }}>
          <Select
            value={location}
            onChange={handleChange}
            size="small"
            sx={{
              width: "100px",
              height: "100%",
              fontSize: "17px",
              fontWeight: "800",
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: 0,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: 0,
              },
            }}
          >
            <MenuItem value={"loc1"}>덕암동</MenuItem>
            <MenuItem value={"loc2"}>구암동</MenuItem>
            <MenuItem value={"loc3"}>봉명동</MenuItem>
            <Divider></Divider>
            <MenuItem value={"loc4"}>내위치 설정</MenuItem>
          </Select>
        </Button>
      </Grid>
      <Grid xs flexGrow={1}>
        <Typography
          variant="h4"
          component="h4"
          sx={{ fontWeight: 800, textAlign: "center" }}
        >
          <Box component="span" sx={{ color: "primary.main" }}>
            S
          </Box>
          quare
        </Typography>
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
  );
}
