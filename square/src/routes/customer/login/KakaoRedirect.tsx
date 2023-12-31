import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { REST_API } from "redux/redux";
import { Unstable_Grid2 as Grid } from "@mui/material";

function KakaoRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      axios
        .get(`${REST_API}api/v1/user/kakao?code=${code}`)
        .then((response) => {
          console.log(response.data);

          const ACCESS_TOKEN = response.headers.authorization;
          const REFRESH_TOKEN = response.headers["refresh-token"];

          if (ACCESS_TOKEN) {
            sessionStorage.setItem("accessToken", ACCESS_TOKEN);
          }
          if (REFRESH_TOKEN) {
            sessionStorage.setItem("refreshToken", REFRESH_TOKEN);
          }
          navigate("/main");
        })
        .catch((error) => {
          console.error("카카오 로그인 에러:", error);
        });
    }
  }, [code, navigate]);

  return (
    <Grid
      container
      xs={12}
      md={8}
      justifyContent="center"
      sx={{ maxWidth: "600px", height: "100%", backgroundColor: "white" }}
    ></Grid>
  );
}

export default KakaoRedirect;
