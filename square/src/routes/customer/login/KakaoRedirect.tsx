import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function KakaoRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => { 
    if (code) {
      axios.get(`http://i9b208.p.ssafy.io:8811/api/v1/user/kakao?code=${code}`)
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
          navigate('/main');
        })
        .catch((error) => {
          console.error('카카오 로그인 에러:', error);
        });
    }
  }, [code, navigate]); 

  return (
    <div>
      
      {code}
    </div>
  );
}

export default KakaoRedirect;
