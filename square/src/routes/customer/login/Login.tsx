/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Button,
  Divider,
} from "@mui/material";

import { REST_API } from "redux/redux";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const [idValid, setIdValid] = useState<boolean>(true);
  const [pwValid, setPwValid] = useState<boolean>(true);
  const [notAllow, setNotAllow] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 로그인을 진행하고, 기본적인 유저 정보와 JWT 토큰을 가져옵니다.

  const getLogin = () => {
    axios({
      url: `${REST_API}user/login`,
      method: "POST",
      data: {
        uid: id,
        password: pw,
        authenticate: "UA01",
      },
    })
      .then((response) => {
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...response.data.address,
            usrId: response.data.usrId,
            usrNick: response.data.userNickname,
            depth: 1,
          })
        );
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setFailed(true);
      });
  };

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 이미 sessionStorage에 토큰이 있다면, 이동합니다.
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const userInfo = sessionStorage.getItem("userInfo");

    if (token && userInfo) {
      navigate("/");
    }
  }, []);

  // ID와 비밀번호가 유효하다면 허가합니다.
  useEffect(() => {
    if (idValid && pwValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [idValid, pwValid]);

  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 함수 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // ID로 들어올 문자열값을 체크합니다.
  const checkId = (inputId: string): void => {
    const regex = /^[a-zA-Z0-9]{6,20}$/;

    setId(inputId);

    if (regex.test(inputId)) setIdValid(true);
    else setIdValid(false);
  };

  // PW로 들어올 문자열값을 체크합니다.
  const checkPw = (inputPw: string): void => {
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    setPw(inputPw);

    if (regex.test(inputPw)) setPwValid(true);
    else setPwValid(false);
  };

  // 로그인 버튼을 누르거나 엔터를 칠 경우 확인을 해보고 실행하는 함수
  const onClickConfirmButton = (): void => {
    checkId(id);
    checkPw(pw);

    if (!notAllow) getLogin();
  };

  const signUpButton = () => {
    navigate(`/signup`);
  };
  const kakaoLogin = (): void => {
    // 카카오 OAuth2.0 인증 페이지로 리다이렉트
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=409915cf48a47370a92cea926084d5a1&redirect_uri=https://i9b208.p.ssafy.io/login/KakaoRedirect&response_type=code";
  };

  const NaverLogin = (): void => {
    window.location.href =
      "https://nid.naver.com/oauth2.0/authorize?client_id=C4jdFBfefASIcQgC9GDg&response_type=code&redirect_uri=https://i9b208.p.ssafy.io/login/NaverRedirect&state=test";
  };

  /* const GoogleLogin = (): void => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=167666714068-su36v2r5mu1j6spjan4cda8q42hbdhf3.apps.googleusercontent.com&redirect_uri=https://i9b208.p.ssafy.io/login/GoogleRedirect&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile email`;
  };*/

  const toSellerLogin = () => {
    navigate("/seller/login");
  };

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      sx={{
        maxWidth: "600px",
        height: "100%",
        backgroundImage: "url(/img/MobileBG.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", // 추가: 상위 컨테이너에 position 속성 추가
      }}
    >
      <Button
        onClick={toSellerLogin}
        sx={{
          position: "absolute", // 절대위치를 이용해서 우측 상단에 위치시키기
          top: 8, // 상단에서의 간격 (원하는대로 조절 가능)
          right: 8, // 우측에서의 간격 (원하는대로 조절 가능)
          padding: "6px 12px", // 버튼 내부 패딩
          fontSize: "0.9rem", // 폰트 사이즈 조절
          backgroundColor: "rgba(255,255,255,0.9)", // 약간의 투명도를 가진 흰색 배경
          "&:hover": {
            backgroundColor: "rgba(255,255,255,1)", // 호버시 투명도 없애기
          },
        }}
      >
        판매자 로그인
      </Button>
      <Grid container xs={8}>
        <Grid
          container
          xs
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/img/Square.png"
              style={{ width: "50%", height: "auto" }}
              alt="SQUARE 로고"
            />
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 800, textAlign: "center" }}
              gutterBottom
            >
              <Box component="span" sx={{ color: "primary.main" }}>
                S
              </Box>
              quare
            </Typography>
          </Grid>
          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
              아이디
            </Typography>
            <TextField
              placeholder="사용자 ID"
              fullWidth
              value={id}
              onChange={(e) => {
                checkId(e.target.value);
              }}
              error={!idValid}
              autoComplete="username"
              helperText={idValid ? "" : "아이디가 올바르지 않습니다."}
            />
          </Grid>
          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "40px" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
              비밀번호
            </Typography>
            <TextField
              type="password"
              placeholder="비밀번호"
              fullWidth
              autoComplete="password"
              value={pw}
              onChange={(e) => {
                checkPw(e.target.value);
              }}
              error={!pwValid}
              helperText={
                pwValid
                  ? ""
                  : "영문, 숫자, 특수문자 포함 8~20자를 입력해주세요."
              }
            />
          </Grid>
          <Grid container xs={12} justifyContent="center">
            <Grid xs={12}>
              <Button
                onClick={onClickConfirmButton}
                variant="contained"
                color="primary"
                sx={{ height: "60px" }}
                fullWidth
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, textAlign: "center" }}
                >
                  로그인
                </Typography>
              </Button>
            </Grid>
            {failed && (
              <Grid xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    textAlign: "center",
                    marginTop: "15px",
                    color: "crimson",
                  }}
                  gutterBottom
                >
                  아이디 혹은 비밀번호가 일치하지 않습니다.
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid container xs={12} sx={{ marginTop: "5px" }}>
            <Grid container xs={6} justifyContent="start">
              <Button color="secondary" onClick={signUpButton}>
                {" "}
                회원가입{" "}
              </Button>
            </Grid>
            <Grid container xs={6} justifyContent="end">
              <Button color="secondary"> 아이디/비밀번호 찾기 </Button>
            </Grid>
            <Grid xs={12}>
              <Divider sx={{ marginTop: "5px" }}></Divider>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Paper sx={{ borderRadius: 1 }}>
              <Button
                onClick={NaverLogin}
                fullWidth
                sx={{
                  padding: 0,
                  display: "flex",
                  backgroundColor: "#00c63b",
                }}
              >
                <img
                  src="/img/icon/naver.png"
                  alt="네이버 로그인"
                  style={{ width: "50px", height: "50px" }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    flexGrow: 1,
                    fontSize: 18,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  네이버 ID로 로그인
                </Typography>
              </Button>
            </Paper>
            <Paper sx={{ marginTop: "5px", borderRadius: 1 }}>
              <Button
                onClick={kakaoLogin}
                fullWidth
                sx={{
                  padding: 0,
                  display: "flex",
                  backgroundColor: "#fade00",
                }}
              >
                <img
                  src="/img/icon/kakao.png"
                  alt="카카오 로그인"
                  style={{ width: "50px", height: "50px" }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "black",
                    flexGrow: 1,
                    fontSize: 18,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  카카오 ID로 로그인
                </Typography>
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
