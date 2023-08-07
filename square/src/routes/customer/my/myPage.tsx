import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { RootState } from "../../../redux/store";

function MyPage() {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user);

  // eslint-disable-next-line no-console
  console.log(userId);
  const [user, setUser] = useState({
    profileImage: "",
    range: "",
    grade: "",
    points: "",
  });

  useEffect(() => {
    const dummyData = {
      profileImage: "https://dummyimage.com/200x200",
      range: "대전광역시 유성구 구암동",
      grade: "Gold",
      points: "5000",
    };

    setUser(dummyData);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const goToSettings = () => {
    navigate("/myinfo");
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ArrowBackIcon onClick={goBack} />
        <Typography variant="h6" sx={{ margin: "auto" }}>
          마이페이지
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "25vh",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={user.profileImage}
          sx={{ width: 300, height: 300, mb: 2 }}
        />
        <Typography variant="subtitle1">
          {userId.nickname}
          <IconButton size="small" onClick={goToSettings}>
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </Typography>
        <Typography variant="subtitle1">{`${user.range}`}</Typography>
        <Typography variant="subtitle1">{`${user.grade}`}</Typography>
        <Typography variant="subtitle1">{`잔여 포인트: ${user.points}`}</Typography>
      </Box>

      <List component="nav">
        <ListItem button onClick={() => navigate("/myarea")}>
          <Typography variant="body1">활동반경 설정</Typography>
        </ListItem>
        <ListItem button onClick={() => navigate("/myorderhistory")}>
          <Typography variant="body1">최근 주문내역 보기</Typography>
        </ListItem>
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
    </>
  );
}

export default MyPage;
