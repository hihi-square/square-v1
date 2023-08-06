// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import {
  Unstable_Grid2 as Grid,
  Typography,
  Paper,
  Box,
  // Button,
  Divider,
} from "@mui/material";
import "App.css";

export default function CategoryStore() {
  // const { category } = useParams<{ category?: string }>();
  // const navigate = useNavigate();

  const lists = [
    {
      storeId: 1,
      thumbnail: "/img/sample/cookie1.png",
      storeName: "펭소네 구멍가게",
      storeMenu: "구멍 뚫린 쿠키 세트, 구멍 안 뚫린 쿠키 세트",
      storeSale: true,
      storeDistance: "3km",
      storeAddress: "대전광역시 유성구 덕명동 1길",
    },
    {
      storeId: 2,
      thumbnail: "/img/sample/cookie2.png",
      storeName: "오다네 구멍가게",
      storeMenu: "오다 가다 먹는 초콜릿 세트, 오다 노부나가, 오다 에이이치로",
      storeSale: true,
      storeDistance: "3km",
      storeAddress: "대전광역시 유성구 덕명동 2길",
    },
    {
      storeId: 3,
      thumbnail: "/img/sample/cookie3.png",
      storeName: "제경이네 실버캐슬",
      storeMenu: "오이 무침(피클화 12%), 은색 식기도 같이 팔겠습니다.",
      storeSale: true,
      storeDistance: "3km",
      storeAddress: "대전광역시 유성구 덕명동 3길",
    },
    {
      storeId: 4,
      thumbnail: "/img/sample/cookie4.png",
      storeName: "테이네 햄버거",
      storeMenu: "햄버거 같은 패티 100개, 테이 버거(만드는데 2주)",
      storeSale: true,
      storeDistance: "3km",
      storeAddress: "대전광역시 유성구 덕명동 4길",
    },
    {
      storeId: 5,
      thumbnail: "/img/sample/cookie5.png",
      storeName: "지희네 혼밥소",
      storeMenu: "현재 휴업중입니다.",
      storeSale: true,
      storeDistance: "3km",
      storeAddress: "대전광역시 유성구 덕명동 5길",
    },
    {
      storeId: 6,
      thumbnail: "/img/sample/cookie6.png",
      storeName: "존나 멋있는 세훈이",
      storeMenu: "후후, 난 최고로 멋있어",
      storeSale: true,
      storeDistance: "3km",
      storeAddress: "대전광역시 유성구 덕명동 6길",
    },
  ];

  return (
    <Grid xs={11} pt={5}>
      {lists.map((list, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{ display: "flex", marginBottom: "10px", width: "100%" }}
        >
          <Grid xs={12} container>
            <Grid container xs={12}>
              <Grid xs="auto">
                <img
                  src={list.thumbnail}
                  style={{ width: "120px", height: "auto" }}
                  alt="menu"
                />
              </Grid>
              <Grid container xs>
                <Box
                  sx={{
                    padding: "2px 2px 0px 0px",
                    paddingBottom: "0px",
                    flex: "1 0 auto",
                    width: "100%",
                  }}
                >
                  <Grid container xs={12}>
                    <Grid xs={12}>
                      <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                          fontWeight: 700,
                          padding: "10px 0px 10px 20px",
                          width: "90%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {list.storeName}
                      </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ overflow: "hidden" }}>
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                          fontWeight: 400,
                          color: "secondary.main",
                          padding: "0px 5px 0px 20px",
                          width: "90%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {list.storeMenu}
                      </Typography>
                    </Grid>
                    <Grid
                      xs={12}
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{
                            fontWeight: 400,
                            padding: "0px 0px 10px 21px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {list.storeAddress}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{
                            fontWeight: 400,
                            padding: "0px 10px 10px 10px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          ({list.storeDistance})
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid xs={12} sx={{ color: "red", padding: "20px" }}>
              <Divider></Divider>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Grid>
  );
}
