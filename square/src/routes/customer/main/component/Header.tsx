import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import "App.css";
import {
  Unstable_Grid2 as Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Button,
  TextField,
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
        height: "60px",
      }}
    >
      {isSearchVisible ? (
        <>
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
        </>
      ) : (
        <>
          <Grid xs>
            <Button>
              <Select
                value={location}
                onChange={handleChange}
                size="small"
                sx={{
                  width: "120px",
                  height: "100%",
                  fontSize: "20px",
                  fontWeight: "500",
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

          <Grid
            xs
            container
            justifyContent="right"
            sx={{ marginRight: "15px" }}
          >
            <Grid>
              <Button onClick={handleSearchClick}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#000000" }}
                  size="2x"
                />
              </Button>
            </Grid>
            <Grid>
              <Button onClick={handleCartClick}>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ color: "#000000" }}
                  size="2x"
                />
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
