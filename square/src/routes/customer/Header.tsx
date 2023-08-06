import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
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
import {
  faShoppingCart,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  cateNum: Number;
  setAni: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export default function Header({ cateNum, setAni }: Props) {
  const navigate = useNavigate();
  const [location, setLocation] = useState("loc1");
  const pageType = useSelector((state: RootState) => state.page);
  const sticky = useSelector((state: RootState) => state.sticky);
  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };
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
        backgroundColor: "white",
        zIndex: 5,
      }}
    >
      {pageType !== "메인" ? (
        <Grid container xs={12} alignItems="center" sx={{ height: "60px" }}>
          <Grid xs={2}>
            <Button
              onClick={() => {
                if (setAni) setAni(true);
                setTimeout(() => {
                  navigate(-1);
                }, 100);
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#000000" }}
                size="2x"
              />
            </Button>
          </Grid>
          <Grid xs={8}>
            <Typography
              variant="h4"
              component="h4"
              sx={{ fontWeight: 700, textAlign: "center" }}
            >
              {pageType}
            </Typography>
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
      ) : (
        <Grid container xs={12} alignItems="center" sx={{ height: "60px" }}>
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
      )}

      {sticky === 1 || pageType === "가게 목록" ? (
        <Grid
          className="animate__animated animate__fadeInDown"
          xs={12}
          sx={{
            backgroundColor: "white",
            zIndex: "2",
            "--animate-duration": "100ms",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              sx={{
                flexGrow: 1,
                backgroundColor: cateNum === 1 ? "lightgrey" : "initial",
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                카페/음료
              </Typography>
            </Button>
            <Button
              sx={{
                flexGrow: 1,
                backgroundColor: cateNum === 2 ? "lightgrey" : "initial",
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                베이커리
              </Typography>
            </Button>
            <Button
              sx={{
                flexGrow: 1,
                backgroundColor: cateNum === 3 ? "lightgrey" : "initial",
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                분식/간식
              </Typography>
            </Button>
            <Button
              sx={{
                flexGrow: 1,
                backgroundColor: cateNum === 4 ? "lightgrey" : "initial",
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                샐러드
              </Typography>
            </Button>
          </Box>
        </Grid>
      ) : (
        <Grid xs={12}>
          <Divider variant="middle"></Divider>
        </Grid>
      )}
    </Grid>
  );
}
