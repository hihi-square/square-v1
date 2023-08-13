import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REST_API } from "redux/redux";

function NaverRedirect() {
  console.log(REST_API);
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  
  console.log({code})
  console.log({REST_API});
  useEffect(() => { 
    console.log(REST_API);
    if (code) {
      axios.get(`${REST_API}api/v1/user/naver?code=${code}&state=test`)
        .then((response) => {
          console.log(response.data);

          const ACCESS_TOKEN = response.data.accessToken;  // 여기를 수정
          const REFRESH_TOKEN = response.data.refreshToken;  // 여기를 

          if (ACCESS_TOKEN) {
            sessionStorage.setItem('accessToken', ACCESS_TOKEN);
          }
          if (REFRESH_TOKEN) {
            sessionStorage.setItem('refreshToken', REFRESH_TOKEN);
          }

          navigate('/main');
        })
        .catch((error) => {
          console.error('네이버 로그인 에러:', error);
          if (error.response) {
            // 서버가 2xx 외의 상태 코드로 응답한 경우
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
          } else if (error.request) {
            // 요청은 만들어졌지만, 응답을 받지 못한 경우
            console.error('No response was received', error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
            console.error('Error', error.message);
          }
        });
    }
  }, [code, navigate]); 

  return (
     <>
  {code} 
  </>)
}

export default NaverRedirect;
