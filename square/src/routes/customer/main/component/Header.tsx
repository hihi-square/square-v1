import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
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
  TextField,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [location, setLocation] = useState("loc1");
  const [search, setSearch] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sticky = useSelector((state: RootState) => state.sticky);

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };
  const handleCartClick = () => {
    // 장바구니 ㄱㄱ
  };
  const handleSearchClick = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;

    setSearch(input);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      {isSearchVisible ? (
        <Grid container xs={12} alignItems="center" sx={{ height: "60px" }}>
          <Grid xs={2}>
            <Button onClick={handleSearchClick}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#000000" }}
                size="2x"
              />
            </Button>
          </Grid>
          <Grid xs={9}>
            <TextField
              placeholder="검색..."
              fullWidth
              value={search}
              onChange={handleSearch}
              size="small"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: 1,
                  borderColor: "black",
                },
              }}
            />
          </Grid>
          <Grid xs={1}></Grid>
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
              <IconButton onClick={handleSearchClick} sx={{ fontSize: "20px" }}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#000000" }}
                />
              </IconButton>
            </Grid>
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

      {sticky === 1 ? (
        <Grid
          container
          justifyContent="space-around"
          className="animate__animated animate__fadeInDown"
          xs={12}
          sx={{
            backgroundColor: "white",
            zIndex: "2",
            "--animate-duration": "100ms",
          }}
        >
          <Button>
            <Typography
              variant="body1"
              component="div"
              sx={{ fontWeight: 700, textAlign: "center" }}
            >
              카페/음료
            </Typography>
          </Button>
          <Button>
            <Typography
              variant="body1"
              component="div"
              sx={{ fontWeight: 700, textAlign: "center" }}
            >
              베이커리
            </Typography>
          </Button>
          <Button>
            <Typography
              variant="body1"
              component="div"
              sx={{ fontWeight: 700, textAlign: "center" }}
            >
              분식/간식
            </Typography>
          </Button>
          <Button>
            <Typography
              variant="body1"
              component="div"
              sx={{ fontWeight: 700, textAlign: "center" }}
            >
              샐러드
            </Typography>
          </Button>
        </Grid>
      ) : (
        <Grid xs={12}>
          <Divider variant="middle"></Divider>
        </Grid>
      )}
    </Grid>
  );
}
