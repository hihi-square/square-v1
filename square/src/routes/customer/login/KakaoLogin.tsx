function KakaoLogin() {
  const KAKAO_URI = "https://kauth.kakao.com/oauth/authorize?client_id=409915cf48a47370a92cea926084d5a1&redirect_uri=http://localhost:3000/login/KakaoRedirect&response_type=code";
  

  return (
    <a href={KAKAO_URI}>
     <img src="public\img\icon\kakao.png" alt="kakaologin" />
    </a>
  );
}


export default KakaoLogin;