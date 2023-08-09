import React, { useState, useEffect } from "react";

import {
  Box,
  Chip,
  Unstable_Grid2 as Grid,
  IconButton,
  InputBase,
  Typography,
  Paper,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "App.css";
import Category from "./Category";

export default function Search() {
  const array: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];
  const textArray: string[] = [
    "도넛",
    "주스",
    "샐러드",
    "커피",
    "빵",
    "케이크",
    "탕후루",
    "간편음식",
    "분식",
    "샌드위치",
    "김밥",
    "회/초밥",
  ];

  const [searchValue, setSearchValue] = useState<string>("");
  const [recentSearch, setRecentSearch] = useState<string[]>([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("search") || "[]");

    setRecentSearch(list);
  }, []);

  const search = () => {
    const keyword = searchValue;
    const tmpList = [...recentSearch];

    tmpList.push(keyword);

    if (tmpList.length > 10) tmpList.shift();
    localStorage.setItem("search", JSON.stringify(tmpList));
    setRecentSearch(tmpList);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchValue(value);
  };
  const handleDelete = (index: number) => {
    const tmpList = [...recentSearch];

    tmpList.splice(index, 1);
    localStorage.setItem("search", JSON.stringify(tmpList));
    setRecentSearch(tmpList);
  };

  return (
    <Grid
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          justifyContent: "space-around",
          width: "90%",
          height: "50px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          fullWidth
          value={searchValue}
          onChange={handleSearch}
          placeholder="가게명 혹은 검색어를 입력하세요."
          inputProps={{ "aria-label": "해시태그로 검색" }}
        />
        <IconButton sx={{ fontSize: "20px" }} onClick={search}>
          <FontAwesomeIcon icon={faSearch} style={{ color: "gray" }} />
        </IconButton>
      </Paper>
      <Typography
        variant="body2"
        component="div"
        sx={{
          fontWeight: 400,
          color: "secondary.main",
          paddingTop: "5px",
          width: "90%",
          textAlign: "left",
        }}
      >
        최근 검색 목록
      </Typography>
      <Box
        sx={{
          display: "flex",
          paddingTop: "5px",
          maxWidth: "90%",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {recentSearch.map((chip, idx) => (
          <>
            <Chip
              label={chip}
              size="small"
              variant="outlined"
              onDelete={() => {
                handleDelete(idx);
              }}
              sx={{
                padding: "0px 0px",
              }}
            />
            <Box sx={{ padding: "0px 5px" }}></Box>
          </>
        ))}
      </Box>

      <Grid
        container
        xs={12}
        sx={{ paddingTop: "10px" }}
        justifyContent="center"
      >
        <Category />
      </Grid>
      <Grid
        container
        xs={12}
        sx={{ paddingTop: "20px" }}
        justifyContent="center"
      >
        {array.map((row, idx) => (
          <Grid container xs={12} justifyContent="center" key={`a${idx}`}>
            {row.map((col, innerIdx) => (
              <Grid
                xs={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={innerIdx}
              >
                <img
                  src={`img/icon/icon${col}.png`}
                  style={{ width: "60%" }}
                  alt="hashtag"
                />
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "secondary.main",
                    padding: "0px",
                    width: "90%",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {textArray[col - 1]}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
