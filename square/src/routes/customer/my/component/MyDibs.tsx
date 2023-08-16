/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Paper,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  BiCartAlt,
  BiArrowBack,
  BiHomeAlt,
  BiMap,
  BiBadgeCheck,
} from "react-icons/bi";

function MyDibs() {
  type dibsList = {
    dibId: number;
    cusId: number;
    stoId: number;
    storeName: string;
    content: string;
    storeAddress: string;
    mainMenu: string;
    logo: string;
    isOpened: boolean;
    latitude: number;
    longtitude: number;
  };
  const token = sessionStorage.getItem("accessToken");
  const [dibs, setDibs] = useState<dibsList[]>([]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/mypage");
  };

  const handleCartClick = () => {
    navigate("/deal/cart");
  };

  const handleHome = () => {
    navigate("/main");
  };

  useEffect(() => {
    axios({
      url: `${REST_API}dibs`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setDibs(response.data.dibsList);
      })
      .catch((error) => {});
  }, []);
  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        {/* 뒤로가기 */}
        <IconButton
          onClick={goBack}
          sx={{ width: "20%", display: "flex", justifyContent: "left" }}
        >
          <BiArrowBack size="24" color="#3d3d3d" />
        </IconButton>
        {/* 내 단골가게 */}
        <Typography
          variant="h6"
          sx={{ margin: "auto", width: "60%", textAlign: "center" }}
        >
          내 단골 가게
        </Typography>
        {/* 홈버튼, 장바구니 버튼  */}
        <Box sx={{ display: "flex", width: "20%" }}>
          <IconButton onClick={handleHome}>
            <BiHomeAlt size="24" color="#3d3d3d" />
          </IconButton>
          <IconButton onClick={handleCartClick}>
            <BiCartAlt size="24" color="#3d3d3d" />
          </IconButton>
        </Box>
      </Box>
      {/* iteration */}
      <Grid container>
        {dibs.map((dib, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{ display: "flex", marginBottom: "10px", width: "100%" }}
            onClick={() => {
              navigate(`/store/${dib && dib.stoId}`);
            }}
          >
            {/* 전체 테두리 */}
            {/* : 버튼 쓰면 height 12vh 로 아니면 16vh  */}
            <Grid
              xs={12}
              container
              sx={{
                py: 1,
                borderBottom: 1,
                borderColor: "#e7e7e7",
                height: "12vh",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  direction: "row",
                  height: "9vh",
                  mb: "2px",
                  width: "100%",
                }}
              >
                {/* 이미지 */}
                <Grid
                  xs={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    direction: "column",
                  }}
                >
                  <Grid xs={12} position={"relative"}>
                    {dib.logo != null ? (
                      <img
                        src={dib.logo}
                        alt="가게 로고"
                        style={{
                          width: "80%",
                          height: "9vh",
                          objectFit: "cover",
                          borderRadius: 5,
                          border: "1px solid #d1d1d1",
                        }}
                      />
                    ) : (
                      <img
                        src="/img/store/store1.png"
                        style={{
                          width: "80%",
                          height: "9vh",
                          objectFit: "cover",
                          borderRadius: 5,
                          border: "1px solid #d1d1d1",
                        }}
                        alt="square 기본 로고"
                      />
                    )}
                    {/* {dib.isOpened} */}
                    {/* 만약 가게가 영업중이 아니라면 */}
                    {!dib.isOpened && (
                      <Grid>
                        <Grid
                          position={"absolute"}
                          sx={{
                            bottom: -1,
                            left: 1,
                            width: "80%",
                            height: "9vh",
                            borderRadius: 1,
                            backgroundColor: "#3d3d3d",
                            border: "1px solid #d1d1d1",
                            opacity: "40%",
                          }}
                        ></Grid>
                        <Grid
                          position={"absolute"}
                          sx={{ width: "80%", bottom: "30%" }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 700,
                              textAlign: "center",
                              color: "#f6f6f6",
                            }}
                          >
                            준비중
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {/* 정보 */}
                <Grid
                  xs={9}
                  sx={{ display: "felx", direction: "column", px: "10px" }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      direction: "row",
                      alignItems: "center",
                      mb: "2px",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "90%",
                        fontSize: 18,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {dib.storeName}
                    </Typography>
                  </Grid>
                  {dib.mainMenu.length > 0 && (
                    <Grid
                      sx={{
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                    >
                      <BiBadgeCheck size="16" />
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 400,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          ml: "4px",
                        }}
                      >
                        {dib.mainMenu}
                      </Typography>
                    </Grid>
                  )}
                  <Grid
                    sx={{
                      display: "flex",
                      direction: "row",
                      alignItems: "center",
                    }}
                  >
                    <BiMap color="#9e9e9e" size="16" />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "secondary.main",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        ml: "4px",
                      }}
                    >
                      {dib.storeAddress}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
    </Box>
  );
}

export default MyDibs;
