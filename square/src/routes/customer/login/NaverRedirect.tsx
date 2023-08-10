import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NaverRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    async function NaverLogin() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/member/login/naver?code=${code}&state=${process.env.NAVER_STATE}`
        );

        // ESLint 경고를 무시하기 위한 주석 추가
        // eslint-disable-next-line dot-notation
        const ACCESS_TOKEN = res.headers["authorization"];
        const REFRESH_TOKEN = res.headers["refresh-token"];

        sessionStorage.setItem("accessToken", ACCESS_TOKEN);
        sessionStorage.setItem("refreshToken", REFRESH_TOKEN);

        navigate("/", { replace: true });
      } catch (error) {
        console.error("네이버 로그인 에러:", error);
      }
    }
    NaverLogin();
  }, [code, navigate]);

  return <div>{code}</div>;
}

export default NaverRedirect;
