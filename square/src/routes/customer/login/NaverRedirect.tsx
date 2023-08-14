/* eslint-disable no-console */
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REST_API } from "redux/redux";

function NaverRedirect() {
  console.log(REST_API);
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      axios
        .get(`${REST_API}api/v1/user/naver?code=${code}&state=test`)
        .then((response) => {
          console.log(response.data);

          const ACCESS_TOKEN = response.data.accessToken; // 여기를 수정
          const REFRESH_TOKEN = response.data.refreshToken; // 여기를 수정

          if (ACCESS_TOKEN) {
            sessionStorage.setItem("accessToken", ACCESS_TOKEN);
          }
          if (REFRESH_TOKEN) {
            sessionStorage.setItem("refreshToken", REFRESH_TOKEN);
          }

          navigate("/main");
        })
        .catch((error) => {
          console.error("네이버 로그인 에러입니다:", error);
        });
    }
  }, [code, navigate]);

  return <></>;
}

export default NaverRedirect;
