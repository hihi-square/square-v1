/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REST_API, RootState } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
} from "@mui/material";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineEdit } from "react-icons/ai";
import {
  BiCommentDetail,
  BiMessageSquareDots,
  BiDollarCircle,
  BiCog,
  BiChevronRight,
} from "react-icons/bi";

function MyPage() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const userId = useSelector((state: RootState) => state.user);

  type User = {
    info: {
      email: string;
      marketingAgree: boolean;
      name: string;
      nickname: string;
      password: string;
      phone: string;
      profile: string;
      uid: string;
    };
    point: number;
    rank: string;
    dibsCount: number;
  };

  // eslint-disable-next-line no-console
  console.log(userId);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // storeId를 사용해 메뉴 정보를 가져오는 API를 호출합니다.

    axios({
      url: `${REST_API}user`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUser({ ...response.data });
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  }, []); // storeId가 변경될 때마다 API 호출을 다시 합니다.

  const handleImageUpload = () => {
    // Implement the image upload functionality here
  };

  return (
    <Grid
      container
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* (사진, 수정), 이름 한묶음 */}
      <Grid
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "25vh",
          mb: "2vh",
        }}
      >
        {/* 사진 및 수정 */}
        <Grid
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 사진 */}
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={user && user.info.profile}
              sx={{ width: 90, height: 90, mb: 2 }}
            />

            {/* 수정 아이콘 */}
            <Box
              sx={{
                zIndex: "tooltip",
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <IconButton onClick={handleImageUpload}>
                <AiOutlineEdit size="20" />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* 회원 이름 */}
        <Grid xs={12}>
          <Typography
            sx={{ fontWeight: 700, textAlign: "center", color: "#3d3d3d" }}
          >
            {user && user.info.nickname}
          </Typography>
        </Grid>
      </Grid>

      {/* 회색 섹션 <내등급, 포인트, 찜> */}
      <Grid
        xs={11}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#e7e7e7",
          borderRadius: 1,
          py: 1.5,
        }}
      >
        {/* 1. 내등급 */}
        <Grid
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: 700, textAlign: "center", color: "#3d3d3d" }}
          >
            내 등급
          </Typography>
          <Typography variant="subtitle1" component="div">
            {user && user.rank}
          </Typography>
        </Grid>

        {/* 2. 포인트 */}
        <Grid
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: 700, textAlign: "center", color: "#3d3d3d" }}
          >
            내 포인트
          </Typography>
          <Typography variant="subtitle1" component="div">
            {user && user.point}
          </Typography>
        </Grid>

        {/* 3. 찜 */}
        <Grid
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => navigate("/mydibs")}
        >
          <Typography
            sx={{ fontWeight: 700, textAlign: "center", color: "#3d3d3d" }}
          >
            단골 가게
          </Typography>
          <Typography variant="subtitle1" component="div">
            {user && user.dibsCount}
          </Typography>
        </Grid>
      </Grid>

      {/* List */}
      <Grid xs={11} sx={{ display: "flex", flexDirection: "column", py: 2 }}>
        <List component="nav">
          <ListItem button onClick={() => navigate("/myreview")}>
            <Grid
              sx={{
                my: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <BiCommentDetail size="20" />
                <Typography sx={{ ml: 1 }} variant="body1">
                  내 리뷰 확인
                </Typography>
              </Grid>
              <BiChevronRight size="20" />
            </Grid>
          </ListItem>
          <ListItem button onClick={() => navigate("/myboard")}>
            <Grid
              sx={{
                my: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <BiMessageSquareDots size="20" />
                <Typography sx={{ ml: 1 }} variant="body1">
                  내가 쓴 글
                </Typography>
              </Grid>
              <BiChevronRight size="20" />
            </Grid>
          </ListItem>
          <ListItem button onClick={() => navigate("/myregular")}>
            <Grid
              sx={{
                my: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <BiDollarCircle size="20" />
                <Typography sx={{ ml: 1 }} variant="body1">
                  내 쿠폰함
                </Typography>
              </Grid>
              <BiChevronRight size="20" />
            </Grid>
          </ListItem>
          <ListItem button onClick={() => navigate("/myinfo")}>
            <Grid
              sx={{
                my: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <BiCog size="20" />
                <Typography sx={{ ml: 1 }} variant="body1">
                  회원정보 수정
                </Typography>
              </Grid>
              <BiChevronRight size="20" />
            </Grid>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default MyPage;
