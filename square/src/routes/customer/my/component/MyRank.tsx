/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { BiCartAlt, BiArrowBack, BiHomeAlt, BiTrophy } from "react-icons/bi";
import { GiFootprint } from "react-icons/gi";
import { TbScooter } from "react-icons/tb";
import { RiEBikeFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";

type Rank = {
  cusId: number;
  name: string;
  rankName: string;
  percentage: number;
  restOrder: number;
  nextRankName: string;
  month: number;
  orderCount: number;
};

function MyRank() {
  const token = sessionStorage.getItem("accessToken");
  const [rank, setRank] = useState<Rank>();
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
      url: `${REST_API}user/rank`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setRank(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <Box sx={{ padding: 3, width: "100%" }}>
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
          내 등급
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

      <Grid spacing={2} xs={12}>
        {/* 회원 개인정보 파트 */}
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            my: 2,
            backgroundColor: "white",
          }}
        >
          {/* 회원정보 */}
          <Grid sx={{ width: "100%", textAlign: "center", my: 2 }}>
            <IconButton
              sx={{
                border: "solid",
                borderColor: "#225a41",
                borderWidth: 5,
                mb: 4,
              }}
            >
              <BiTrophy size={48} color="#225a41" />
            </IconButton>
            <Typography>
              {rank?.rankName} {rank?.name}님의
            </Typography>
            <Typography style={{ marginBottom: 12 }}>
              {rank?.month}월 주문횟수는 {rank?.orderCount}회 입니다.
            </Typography>
            <Typography>{rank?.rankName}의 주문당 포인트 적립금액은</Typography>
            <Typography>{rank?.percentage}%입니다.</Typography>
          </Grid>
          {/* 회색 박스 */}
          {rank?.nextRankName != null && (
            <Grid
              sx={{
                width: "80%",
                textAlign: "center",
                backgroundColor: "#e7e7e7",
                borderRadius: 1,
                py: 1,
                my: 2,
              }}
            >
              <Typography>{rank?.restOrder}번만 더 주문하면</Typography>
              <Typography>{rank?.nextRankName}가 되요</Typography>
            </Grid>
          )}
        </Grid>
        {/* 구분선 */}
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            my: 2,
            backgroundColor: "white",
          }}
        >
          <Divider sx={{ width: "80%" }} color="#e7e7e7" />
        </Grid>
        {/* 랭크 정보 */}
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            my: 2,
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{ fontSize: 20, fontWeight: 700, color: "#3d3d3d", my: 2 }}
          >
            등급 정보
          </Typography>
          <Grid sx={{ width: "80%", textAlign: "center" }}>
            {/* 1. 랭크정보 */}
            <Grid
              container
              sx={{
                width: "100%",
                py: 1,
                borderTop: 1,
                borderBottom: 1,
                borderColor: "#e7e7e7",
              }}
            >
              {/* 아이콘 */}
              <Grid
                sx={{
                  display: "flex",
                  direction: "row",
                  width: "100%",
                }}
              >
                {/* 이미지 */}
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20%",
                  }}
                >
                  <IconButton
                    sx={{
                      border: "solid",
                      borderColor: "#225a41",
                      borderWidth: 3,
                      my: 1,
                    }}
                  >
                    <GiFootprint size={24} color="#225a41" />
                  </IconButton>
                </Grid>
                {/* 정보 */}
                <Grid sx={{ width: "80%", px: "10px", textAlign: "left" }}>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#3d3d3d",
                      mb: 1,
                    }}
                  >
                    뚜벅이
                  </Typography>
                  <Typography sx={{ color: "#3d3d3d" }}>
                    월 0~4회 주문시 적립 없음
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* 2. 랭크정보 */}
            <Grid
              container
              sx={{
                width: "100%",
                py: 1,
                borderTop: 1,
                borderBottom: 1,
                borderColor: "#e7e7e7",
              }}
            >
              {/* 아이콘 */}
              <Grid
                sx={{
                  display: "flex",
                  direction: "row",
                  width: "100%",
                }}
              >
                {/* 이미지 */}
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20%",
                  }}
                >
                  <IconButton
                    sx={{
                      border: "solid",
                      borderColor: "#225a41",
                      borderWidth: 3,
                      my: 1,
                    }}
                  >
                    <TbScooter size={24} color="#225a41" />
                  </IconButton>
                </Grid>
                {/* 정보 */}
                <Grid sx={{ width: "80%", px: "10px", textAlign: "left" }}>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#3d3d3d",
                      mb: 1,
                    }}
                  >
                    씽씽이
                  </Typography>
                  <Typography sx={{ color: "#3d3d3d" }}>
                    월 5회 이상 주문시 1% 적립
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* 3. 랭크정보 */}
            <Grid
              container
              sx={{
                width: "100%",
                py: 1,
                borderTop: 1,
                borderBottom: 1,
                borderColor: "#e7e7e7",
              }}
            >
              {/* 아이콘 */}
              <Grid
                sx={{
                  display: "flex",
                  direction: "row",
                  width: "100%",
                }}
              >
                {/* 이미지 */}
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20%",
                  }}
                >
                  <IconButton
                    sx={{
                      border: "solid",
                      borderColor: "#225a41",
                      borderWidth: 3,
                      my: 1,
                    }}
                  >
                    <RiEBikeFill size={24} color="#225a41" />
                  </IconButton>
                </Grid>
                {/* 정보 */}
                <Grid sx={{ width: "80%", px: "10px", textAlign: "left" }}>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#3d3d3d",
                      mb: 1,
                    }}
                  >
                    슝슝이
                  </Typography>
                  <Typography sx={{ color: "#3d3d3d" }}>
                    월 15회 이상 주문시 3% 적립
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* 4. 랭크정보 */}
            <Grid
              container
              sx={{
                width: "100%",
                py: 1,
                borderTop: 1,
                borderBottom: 1,
                borderColor: "#e7e7e7",
              }}
            >
              {/* 아이콘 */}
              <Grid
                sx={{
                  display: "flex",
                  direction: "row",
                  width: "100%",
                }}
              >
                {/* 이미지 */}
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20%",
                  }}
                >
                  <IconButton
                    sx={{
                      border: "solid",
                      borderColor: "#225a41",
                      borderWidth: 3,
                      my: 1,
                    }}
                  >
                    <FaCar size={24} color="#225a41" />
                  </IconButton>
                </Grid>
                {/* 정보 */}
                <Grid sx={{ width: "80%", px: "10px", textAlign: "left" }}>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#3d3d3d",
                      mb: 1,
                    }}
                  >
                    붕붕이
                  </Typography>
                  <Typography sx={{ color: "#3d3d3d" }}>
                    월 30회 이상 주문시 5% 적립
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyRank;
