import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Collapse,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { BiArrowBack } from "react-icons/bi";

function MyInfo() {
  const navigate = useNavigate();

  const [user] = useState({
    nickname: "User", // Replace this with the actual nickname
    address: "대전광역시 유성구 구암동", // Replace this with the actual address
    email: "user@example.com", // Replace this with the actual email
  });

  const [open, setOpen] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {/* 뒤로가기 */}
        <IconButton
          onClick={goBack}
          sx={{ width: "20%", display: "flex", justifyContent: "left" }}
        >
          <BiArrowBack size="24" color="#3d3d3d" />
        </IconButton>
        {/* 이름 */}
        <Typography
          variant="h6"
          sx={{ margin: "auto", width: "80%", textAlign: "center" }}
        >
          내 정보 수정
        </Typography>
        {/* 크기맞추기용 빈박스 */}
        <Box sx={{ display: "flex", width: "20%" }}></Box>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ minHeight: "65vh", alignContent: "center" }}
      >
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#3d3d3d" }}>
            내 정보
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <TextField fullWidth label="닉네임" defaultValue={user.nickname} />
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <TextField fullWidth label="대표 주소" defaultValue={user.address} />
        </Grid>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <TextField fullWidth label="대표 이메일" defaultValue={user.email} />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleToggle}>{open ? "닫기" : "약관 보기"}</Button>
          <Button onClick={logout}>로그아웃</Button>
          <Collapse in={open}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                overflow: "auto",
                maxHeight: 270,
              }}
            >
              <Typography variant="body2">
                {
                  "알기도 전에 느낀 고독이란 단어의 뜻 세상은 쉽게 변해 매 순간이 과거의 끝 그래 나 차가워 진 듯 그게 나의 방어인 듯 비극이 단연 이 극작가의 사명인 듯 과연 지긋 지긋한 생활의 끝에 끈처럼 풀릴까 미숙한 내 맘의 문제 세월의 행진 속에 미급한 내 발의 무게 늘 시급한 세상의 숙제 잊은 듯 한 제자리뿐인데 독한 술에 취해 늘 가위 눌린 듯 날 구속한 꿈의 뒤에 그림자 환청인가 뒤를 잠시 보니 어느새 귓가엔 낡은 필름 되감기는 소리 눈떠 보니 yesterday 수줍던 그때 책속에 낙엽을 둔 채 꿈을 줍던 그대 계속해 아무도 모르게 웃고 울던 그대 창 밖에 홀로 바람에 불던 그네 어둡던 그대는 나였지 시작에서 벌써부터 얼어 붙어있던 심장에서 책의 주인공과 같은 공간과 시간에서 감성이 민감 했었던 나를 위안했어 길고 긴 긴 잠에서 눈을 떠 형제와 다른 사고가 사고와 부딪혀 형태를 찾은 그 순간에 고독 성경공부 시간에 내뱉은 신성 모독 그토록 순종했던 내 맑은 피가 선악과의 거름이 돼 그 작은 씨가 자랐는데 그 누가 사상의 순결을 가르치나 운명을 향한 반역심이 내 하마르티아 가슴이 아프니까 지쳤겠지 아버지가 날 외면했지 아들인가 싶었겠지 너무 어리석어 내 글씨가 내 손에서 짧은 시가 되곤 했어 남은 시간 계속해서 서서히 걸어  때론 달렸고 벽에 걸린 달력도 낡아지며 낙엽도 내 맘에 쌓였고 흐트러진 목표와 초점 무심코 나 쫓던 무지개의 끝엔 나란 무인도가 종점 때론 도망치고 싶은데 멈출 수 없는 건 아직도 공책을 찢고 돌아설 수 없는 건 세상의 파도 속에서 사상의 감옥 속에서 밤이 찾아오면 반복되는 악몽 속에서  바다를 뒤엎을 수천만의 피를 봤지 진실의 거짓과 거짓의 진실을 봤지 쇠사슬을 목에 차는 지식의 사치 벽이 된 눈에 못을 박은 현실의 망치  힙합씬의 가치 그 따윈 관심 없어 내 꿈은 나와 너보다 훨씬 커 죽길 바란다면 죽어줄게 웃겨주길 바란다면 그저 바보처럼 웃어줄게 땅속에 눕혀 줄 때 when my body turns cold you will know I remapped the human soul when my body turns cold you will know I remapped the human soul"
                }
              </Typography>
            </Box>
          </Collapse>
        </Grid>

        {/* 수정하기 */}
        <Grid
          sx={{
            position: "fixed",
            mx: 1,
            py: 2,
            bottom: "1vh",
            left: 0,
            right: 0,
            backgroundColor: "#e7e7e7",
            placeItems: "center",
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{ fontWeight: 700, textAlign: "center", color: "#3d3d3d" }}
          >
            수정하기
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyInfo;
