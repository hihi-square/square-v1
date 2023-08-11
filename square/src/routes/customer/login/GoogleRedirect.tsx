import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import axios from 'axios';
function GoogleRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => { 
    if (code) {
      axios.get(`http://i9b208.p.ssafy.io:8811/api/v1/user/google?code=${code}`)
        .then((response) => {
          console.log(response.data);
          const ACCESS_TOKEN = response.headers.authorization;
          const REFRESH_TOKEN = response.headers["refresh-token"];

          if (ACCESS_TOKEN) {
            sessionStorage.setItem('accessToken', ACCESS_TOKEN);
          }
          if (REFRESH_TOKEN) {
            sessionStorage.setItem('refreshToken', REFRESH_TOKEN);
          }

          navigate('/');
        })
        .catch((error) => {
          console.error('구글 로그인 에러:', error);
        });
    }
  }, [code, navigate]); // code와 navigate에 의존성을 추가합니다.

  return (
    <div>
      {code}
    </div>
  );
}

  
  export default GoogleRedirect;
  