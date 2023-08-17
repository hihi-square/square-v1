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
  "아메리카노",
  "아이스아메리카노",
  "카페라떼",
  "카페모카",
  "당근주스",
  "사과주스",
  "토마토주스",
  "흑당버블티",
  "당근케이크",
  "초코케이크",
  "말차케이크",
  "얼그레이쉬폰케이크",
  "쉬림프샐러드",
  "치킨샐러드",
  "연어샐러드",
  "참치샐러드",
  "로티세리치킨샐러드",
  "스테이크샐러드",
  "에그샐러드",
  "콥샐러드",
  "BLT샐러드",
  "아보카도샐러드",
  "연어초밥",
  "새우초밥",
  "고등어초밥",
  "후토마키",
  "광어초밥",
  "도미초밥",
  "장어초밥",
  "계란초밥",
  "전갱이초밥",
  "마라떡볶이",
  "짜장떡볶이",
  "로제떡볶이",
  "물만두",
  "군만두",
  "야끼소바",
  "오꼬노미야끼",
  "물국수",
  "비빔국수",
  "비빔냉면",
  "물냉면",
  "라면",
  "만두라면",
  "해장라면",
  "떡라면",
  "순대",
  "치즈버거",
  "불고기버거",
  "오징어버거",
  "짜장면",
  "간짜장",
  "짬뽕",
  "차돌짬뽕",
  "고추짜장",
  "잡채밥",
  "고추잡채",
  "유산슬",
  "팔보채",
  "멘보샤",
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
        검색어 추천
      </Typography>
      <Box
        sx={{
          display: "flex",
          paddingTop: "5px",
          maxWidth: "90%",
          whiteSpace: "nowrap",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {recomArr &&
          recomArr.map((chip, idx) => (
            <Chip
              key={idx}
              label={chip}
              size="small"
              variant="outlined"
              onClick={() => {
                navigate(`/list/${chip}`);
              }}
              sx={{ margin: "0px 5px" }}
            />
          ))}
      </Box>

      <Grid container xs={12} justifyContent="center">
        <Category />
      </Grid>
    </Grid>
  );
}
