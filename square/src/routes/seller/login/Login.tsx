/** @jsxImportSource @emotion/react */

import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { REST_API } from "redux/redux";

export default function Login() {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const [idValid, setIdValid] = useState<boolean>(true);
  const [pwValid, setPwValid] = useState<boolean>(true);
  const [notAllow, setNotAllow] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    if (idValid && pwValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [idValid, pwValid]);

  const handleId = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputId = e.target.value;

    setId(inputId);
    const regex = /^[a-z]+[a-z0-9]{5,19}$/g;

    if (regex.test(inputId)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const checkId = (inputId: string): void => {
    setId(inputId);
    const regex = /^[a-z]+[a-z0-9]{5,19}$/g;

    if (regex.test(inputId)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const handlePw = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputPw = e.target.value;

    setPw(inputPw);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(inputPw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const checkPw = (inputPw: string): void => {
    setPw(inputPw);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(inputPw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const navigate = useNavigate();

  const onClickConfirmButton = (): void => {
    checkId(id);
    checkPw(pw);

    if (!notAllow)
      axios({
        url: `${REST_API}user/login`,
        method: "POST",
        data: {
          uid: id,
          password: pw,
          authenticate: "UA02",
        },
      })
        .then((response) => {
          const userInfo = {
            userId: response.data.usrId,
            userNick: response.data.userNickname,
          };

          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);

          navigate("/seller/dashboard");
        })
        .catch((error) => {
          console.log(error);
          console.log("gd");
          setFailed(true);
        });
  };

  return (
    <>
      <Grid container xs={12} md={8}>
        <Grid
          container
          xs
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={10}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 800, textAlign: { xs: "center", md: "start" } }}
              gutterBottom
            >
              <Box component="span" sx={{ color: "primary.main" }}>
                S
              </Box>
              quare
            </Typography>
          </Grid>
          <Grid xs={9}>
            <Box component="form">
              <Box sx={{ height: "130px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 400 }}
                  gutterBottom
                >
                  아이디
                </Typography>
                <TextField
                  placeholder="사용자 ID"
                  fullWidth
                  value={id}
                  onChange={handleId}
                  error={!idValid}
                  autoComplete="username"
                  helperText={idValid ? "" : "올바른 아이디를 입력해주세요."}
                />
              </Box>
              <Box sx={{ height: "130px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 400 }}
                  gutterBottom
                >
                  비밀번호
                </Typography>
                <TextField
                  type="password"
                  placeholder="비밀번호"
                  fullWidth
                  autoComplete="password"
                  value={pw}
                  onChange={handlePw}
                  error={!pwValid}
                  helperText={
                    pwValid
                      ? ""
                      : "영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."
                  }
                />
              </Box>
            </Box>
          </Grid>
          <Grid container xs={9} justifyContent="center">
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
                  sx={{ fontWeight: 400, textAlign: "center" }}
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
            <Grid
              container
              xs={12}
              justifyContent="space-between"
              sx={{ marginTop: "30px" }}
            >
              <Grid xs={3}>
                <Button>
                  <img
                    src="/img/icon/naver.png"
                    alt="네이버 로그인"
                    style={{ width: "60px", height: "60px" }}
                  />
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button>
                  <img
                    src="/img/icon/kakao.png"
                    alt="카카오 로그인"
                    style={{ width: "60px", height: "60px" }}
                  />
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button>
                  <img
                    src="/img/icon/google.png"
                    alt="구글 로그인"
                    style={{ width: "60px", height: "60px" }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={10}>
            <Grid xs={12}>
              <Divider sx={{ margin: "10px" }}></Divider>
            </Grid>
            <Grid container xs={6} justifyContent="start">
              <Button color="secondary"> 회원가입 </Button>
            </Grid>
            <Grid container xs={6} justifyContent="end">
              <Button color="secondary"> 아이디/비밀번호 찾기 </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
