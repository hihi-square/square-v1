import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const recommend = [
  "그제의 추천",
  "어제의 추천",
  "오늘의 추천",
  "내일의 추천",
  "모레의 추천",
  "글피의 추천",
  "제경의 추천",
  "지희의 추천",
  "다희의 추천",
  "동현의 추천",
  "세훈의 추천",
  "소연의 추천",
];

export default function Search() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [recomArr, setRecomArr] = useState<string[]>([]);

  useEffect(() => {
    const randomRecommend = getRandomRecommend(recommend, 10);

    setRecomArr(randomRecommend);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchValue(value);
  };

  // 랜덤 추천 함수를 만듭니다.
  const getRandomRecommend = (arr: string[], count: number) => {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
  };

  const search = () => {
    navigate(`/list/${searchValue}`);
  };

  return (
    <Grid
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 0px",
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
        <IconButton
          sx={{ fontSize: "20px" }}
          onClick={() => {
            search();
          }}
        >
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
        {recomArr &&
          recomArr.map((chip, idx) => (
            <Grid key={idx}>
              <Chip
                label={chip}
                size="small"
                variant="outlined"
                sx={{
                  padding: "0px 0px",
                }}
              />
              <Box sx={{ padding: "0px 5px" }}></Box>
            </Grid>
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
    </Grid>
  );
}
