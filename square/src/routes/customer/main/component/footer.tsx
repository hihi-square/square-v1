import React from "react"; 
import { useNavigate } from "react-router-dom";
import "../../../../App.css";

function Footer() {
  const navigate = useNavigate();

  const handleMyPage = () => {
    navigate('/mypage');
  };

  return (
    <footer className="App-footer">
      <button className="App-footer-button">검색</button>
      <button className="App-footer-button">커뮤니티</button>
      <button className="App-footer-button">홈</button>
      <button className="App-footer-button">채팅</button>
      <button className="App-footer-button" onClick={handleMyPage}>마이</button>
    </footer>
  );
}

export default Footer;
