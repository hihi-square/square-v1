import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function KakaoRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState<string | null>(null); 

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authCode = urlParams.get('code'); 

    if (authCode) {
      setCode(authCode); 
    }
  }, [location]);

  useEffect(() => { 
    if (code) {
      axios.get(`http://i9b208.p.ssafy.io:8811/api/v1/user/kakao?code=${code}`)
        .then((response) => {
          console.log(response.data);
          const jwtToken = response.data.jwtToken;

          if (jwtToken) {
            sessionStorage.setItem('jwtToken', jwtToken);
          }
          navigate('/');
        })
        .catch((error) => {
          console.error('Error sending the authorization code to the backend:', error);
        });
    }
  }, [code, navigate]); // code와 navigate에 의존성을 추가합니다.

  return (
    <div>
      
      {code}
    </div>
  );
}

export default KakaoRedirect;
