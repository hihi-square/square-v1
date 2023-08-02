import { Route, Routes } from "react-router-dom";
import React from "react"; // 따옴표로 변경
import "../../App.css";
// import SearchMap from "./searchMap";
// import Board from "./board/boardMain";
import MainPage from "./mainPage";
// import Chat from "./chat";
// import MyPage from "../my/myPage";

function Footer(){
	return (
		<footer className="App-footer">
			<button className="App-footer-button">검색</button>
			<button className="App-footer-button">커뮤니티</button>
			<button className="App-footer-button">홈</button>
			<button className="App-footer-button">채팅</button>
			<button className="App-footer-button">마이</button>

			<Routes>
				{/* <Route path="/map" element={<SearchMap />} />
				<Route path="/board" element={<Board />} /> */}
				<Route path="/" element={<MainPage />} />
				{/* <Route path="/chat" element={<Chat />} />
				<Route path="/mypage" element={<MyPage />} /> */}
			</Routes>
		</footer>
	);
}

export default Footer;
