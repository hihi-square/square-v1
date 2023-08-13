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
  // Box,
  List,
  ListItem,
  IconButton,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

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
    social: string;
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

  const goToSettings = () => {
    navigate("/myinfo");
  };

  return (
    <Grid container xs={12} flexDirection="column" alignItems="center">
      <Grid
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "25vh",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={user && user.info.profile}
          sx={{ width: 250, height: 250, mb: 2 }}
        />
      </Grid>
      <Grid container xs={12}>
        <Grid xs={2}></Grid>
        <Grid
          xs={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ fontWeight: 700, textAlign: "center" }}
          >
            {user && user.info.nickname}
          </Typography>
        </Grid>
        <Grid xs={2}>
          <IconButton onClick={goToSettings}>
            <FontAwesomeIcon
              icon={faGear}
              style={{ color: "#000000" }}
              size="1x"
            />
          </IconButton>
        </Grid>
      </Grid>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ fontWeight: 700, textAlign: "right" }}
      >
        {user && user.rank}
      </Typography>
      <Typography variant="subtitle1">{`잔여 포인트: ${
        user && user.point
      }`}</Typography>

      <List component="nav">
        <ListItem button onClick={() => navigate("/myreview")}>
          <Typography variant="body1">내 리뷰 확인</Typography>
        </ListItem>
        <ListItem button onClick={() => navigate("/myregular")}>
          <Typography variant="body1">내 단골 가게</Typography>
        </ListItem>
        <ListItem button onClick={() => navigate("/myboard")}>
          <Typography variant="body1">내 커뮤니티 글 보기</Typography>
        </ListItem>
      </List>
    </Grid>
  );
}

export default MyPage;
