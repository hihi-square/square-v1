import React, { useState, useRef, useEffect } from "react";
import "App.css";
import {
  Unstable_Grid2 as Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Button,
} from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [location, setLocation] = useState("loc1");
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
    setIsSearchVisible(true);
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
    <Grid xs={12} container component="header" justifyContent="space-between">
      <Grid>
        <Button>
          <Select
            value={location}
            onChange={handleChange}
            sx={{
              width: "150px",
              fontSize: "20px",
              fontWeight: "500",
              ".MuiOutlinedInput-notchedOutline": {
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
      {isSearchVisible && (
        <Grid>
          <input
            type="text"
            ref={searchInputRef}
            className="App-header-search"
          />
        </Grid>
      )}
      <Grid container>
        <Grid>
          <Button
            className="App-header-button"
            ref={searchButtonRef}
            onClick={handleSearchClick}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#000000" }}
            />
          </Button>
        </Grid>
        <Grid>
          <Button className="App-header-button" onClick={handleCartClick}>
            <FaShoppingCart />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Header;
