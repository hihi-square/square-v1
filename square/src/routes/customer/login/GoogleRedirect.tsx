import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REST_API } from "redux/redux";

// import axios from 'axios';
function GoogleRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  console.log({code})
  
  useEffect(() => { 
    if (code) {
      axios.get(`${REST_API}api/v1/user/google?code=${code}`)
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
          console.error('구글 로그인 에러:', error);
        });
    }
  }, [code, navigate]); 

  return (
    <div>
    </div>
  );
}

  
  export default GoogleRedirect;
  