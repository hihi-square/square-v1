
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function KakaoRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 인증 코드나 토큰을 추출합니다.
    // const urlParams = new URLSearchParams(location.search);
    // const code = urlParams.get('code');
    // TODO: 인증 코드로 토큰을 교환하거나 필요한 작업 수행

    // 작업이 완료된 후 다른 페이지로 리다이렉트하거나 메인 페이지로 돌아갈 수 있습니다.
    // navigate('/main'); // 예: 메인 페이지로 돌아갑니다.
  }, [location, navigate]);

  return (
    <div>
      카카오 로그인 처리 중...
    </div>
  );
}

  
  export default KakaoRedirect;
  