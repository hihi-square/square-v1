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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { BiCartAlt, BiArrowBack, BiHomeAlt, BiTrash } from "react-icons/bi";

function MyPoint() {
  type Point = {
    pointId: number;
    createAt: string;
    storeName: string;
    type: number;
    point: number;
  };

  const token = sessionStorage.getItem("accessToken");
  const [points, setPoints] = useState<Point[]>();
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [name, setName] = useState<string>();
  const [count, setCount] = useState<number>();
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
      url: `${REST_API}point`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        setTotalPoint(data.totalPoint);
        setName(data.name);
        setCount(data.count);
        setPoints(data.pointList);
      })
      .catch((error) => {});
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      {/* 초록 배경 */}
      <Grid sx={{ backgroundColor: "#52a982" }}>
        {/* 헤더 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 3,
          }}
        >
          {/* 뒤로가기 */}
          <IconButton
            onClick={goBack}
            sx={{ width: "20%", display: "flex", justifyContent: "left" }}
          >
            <BiArrowBack size="24" color="#f6f6f6" />
          </IconButton>
          {/* 내 단골가게 */}
          <Typography
            variant="h6"
            sx={{
              margin: "auto",
              width: "60%",
              textAlign: "center",
              color: "#f6f6f6",
            }}
          >
            내 포인트
          </Typography>
          {/* 홈버튼, 장바구니 버튼  */}
          <Box sx={{ display: "flex", width: "20%" }}>
            <IconButton onClick={handleHome}>
              <BiHomeAlt size="24" color="#f6f6f6" />
            </IconButton>
            <IconButton onClick={handleCartClick}>
              <BiCartAlt size="24" color="#f6f6f6" />
            </IconButton>
          </Box>
        </Box>
        {/* 가운데 정렬 */}
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid sx={{ width: "80%", py: 2, px: "10px" }}>
            <Typography
              sx={{ fontSize: 40, fontWeight: 700, color: "#f6f6f6" }}
            >
              {totalPoint} P
            </Typography>
            <Typography style={{ marginBottom: 12, color: "#f6f6f6" }}>
              {name}님의 포인트
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* 포인트 내역 */}
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {count !== 0 ? (
          // 포인트 있을때
          <Grid sx={{ width: "80%" }}>
            <Grid sx={{ width: "100%", pt: 2, pb: 1, px: "10px" }}>
              <Typography>총 {count}건의 내역이 있습니다.</Typography>
            </Grid>
            {/* 개인 내역 */}
            {points?.map((point, index) => (
              <Grid
                key={index}
                container
                sx={{
                  width: "100%",
                  py: 1,
                  borderTop: 1,
                  borderColor: "#e7e7e7",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    direction: "row",
                    width: "100%",
                  }}
                >
                  {/* 정보 */}
                  <Grid sx={{ width: "70%", px: "10px", textAlign: "left" }}>
                    <Typography
                      sx={{ fontSize: 20, fontWeight: 700, color: "#3d3d3d" }}
                    >
                      {point.storeName}
                    </Typography>
                    <Typography sx={{ color: "#3d3d3d" }}>
                      {point.createAt}
                    </Typography>
                  </Grid>
                  {/* 금액 */}
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "end",
                      width: "30%",
                      px: "10px",
                    }}
                  >
                    {point.type === 0 ? (
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 500, color: "#225a41" }}
                      >
                        + {point.point}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 500, color: "#bb3713" }}
                      >
                        - {point.point}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          // 포인트 내역 없을때
          <Grid sx={{ width: "80%", pt: 2, textAlign: "center" }}>
            <IconButton
              sx={{
                border: "solid",
                borderColor: "#225a41",
                borderWidth: 5,
                mt: 4,
              }}
            >
              <BiTrash size={52} color="#225a41" />
            </IconButton>
            <Typography sx={{ fontSize: 20, mt: 4 }}>
              포인트 적립 내역이 없습니다.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default MyPoint;
