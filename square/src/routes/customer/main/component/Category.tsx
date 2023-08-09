import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSticky } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  // Typography,
  // TextField,
  // Box,
  // Button,
  // Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
} from "@mui/material";

import "App.css";

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

  type CategoryType = {
    id: number;
    name: string;
    image: string;
  };

  // 카테고리 정보를 저장할 상태 변수
  const [categories] = useState<Array<CategoryType>>([
    { id: 1, name: "카페/음료", image: "drink.png" },
    { id: 2, name: "베이커리", image: "bake.png" },
    { id: 3, name: "분식/간식", image: "snack.png" },
    { id: 4, name: "샐러드", image: "salad.png" },
  ]); // 변경된 이름 사용

  const handleCategoryClick = (categoryValue: Number, pageName: String) => {
    navigate(`/list/${categoryValue}`);
  };

  return (
    <Grid xs={11} mt={2} id="stickyCategory">
      <Paper elevation={6}>
        <ImageList sx={{ width: "100%", height: "auto", margin: 0 }}>
          {categories.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`/img/categories/${item.image}`}
                alt={item.name}
                loading="lazy"
                onClick={() => {
                  handleCategoryClick(item.id, item.name);
                }}
              />
              <ImageListItemBar
                sx={{
                  height: "20%",
                  "& .MuiImageListItemBar-titleWrap": {
                    paddingBottom: 0,
                    paddingTop: 0,
                    display: "flex",
                    justifyContent: "end",
                    AlignItem: "center",
                  },
                  "& .MuiImageListItemBar-title": {
                    textAlign: "end",
                    fontWeight: 600,
                  },
                }}
                title={item.name}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Grid>
  );
}
