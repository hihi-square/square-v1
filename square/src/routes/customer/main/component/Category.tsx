import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSticky } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Typography,
  // TextField,
  Paper,
  // Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import "App.css";

const itemData = [
  [
    {
      img: "/img/categories/drink.png",
      title: "음료",
      rows: 2,
      cols: 2,
      rep: true,
    },
    {
      img: "/img/categories/coffee.png",
      title: "커피",
      cols: 2,
    },
    {
      img: "/img/categories/juice.png",
      title: "쥬스",
    },
    {
      img: "/img/categories/tea.png",
      title: "버블티",
    },
  ],
  [
    {
      img: "/img/categories/cookie.png",
      title: "쿠키",
      rows: 2,
    },
    {
      img: "/img/categories/bakery.png",
      title: "베이커리",
      rows: 2,
      cols: 2,
      rep: true,
    },
    {
      img: "/img/categories/bread.png",
      title: "빵",
    },
    {
      img: "/img/categories/cake.png",
      title: "케이크",
    },
  ],
  [
    {
      img: "/img/categories/salad.png",
      title: "샐러드",
      cols: 2,
    },
    {
      img: "/img/categories/fresh.png",
      title: "신선식품",
      rows: 2,
      cols: 2,
      rep: true,
    },
    {
      img: "/img/categories/sushi.png",
      title: "초밥",
      cols: 2,
    },
  ],
  [
    {
      img: "/img/categories/dduck.png",
      title: "떡볶이",
    },
    {
      img: "/img/categories/cook.png",
      title: "조리",
      rows: 2,
      cols: 2,
      rep: true,
    },
    {
      img: "/img/categories/burger.png",
      title: "버거",
    },
    {
      img: "/img/categories/tacho.png",
      title: "타코야끼",
    },
    {
      img: "/img/categories/kkochi.png",
      title: "꼬치",
    },
  ],
];

const textData = [
  ["카페/음료", "커피나 음료를 사세요."],
  ["베이커리", "신선한 빵을 사보세요."],
  ["조리식품", "분식과 같은 조리식품을 사드세요."],
  ["신선식품", "신선합니다요"],
];

export default function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSticky = () => {
      const offsetTop =
        document.getElementById("stickyCategory")?.offsetTop || 0;

      if (window.scrollY >= offsetTop + 50) {
        dispatch(setSticky({ pageType: "main", value: 1 }));
      } else {
        dispatch(setSticky({ pageType: "main", value: 2 }));
      }
    };

    window.addEventListener("scroll", checkSticky);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", checkSticky);
    };
  }, [dispatch]);

  const handleClick = (idx: number) => {
    navigate(`/list/${idx + 1}`);
  };

  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <Grid xs={12} mt={2} id="stickyCategory">
      {[0, 1, 2, 3].map((idx) => (
        <Paper
          sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
          onClick={() => {
            handleClick(idx);
          }}
          key={idx}
          elevation={1}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "end ",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "black",
                fontWeight: 700,
                textAlign: "start",
              }}
            >
              {textData[idx][0]}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "grey",
                fontWeight: 400,
                marginLeft: "20px",
                textAlign: "start",
              }}
            >
              {textData[idx][1]}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <ImageList
              sx={{ width: "95%", height: "auto", marginTop: "2px" }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {itemData[idx].map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                  />
                  {!item.rep && (
                    <ImageListItemBar
                      sx={{
                        height: "30px",
                        "& .MuiImageListItemBar-titleWrap": {
                          paddingBottom: 0,
                          paddingTop: 0,
                          display: "flex",
                          justifyContent: "end",
                          AlignItem: "center",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                        "& .MuiImageListItemBar-title": {
                          fontWeight: 500,
                          fontSize: "16px",
                        },
                      }}
                      title={item.title}
                    />
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Paper>
      ))}
    </Grid>
  );
}
