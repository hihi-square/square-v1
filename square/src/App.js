import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';
import Dashboard from './Dashboard';


// export default function App() {
// 	const navigate = useNavigate();
  
// 	// 앱이 로드될 때마다 리프레시 토큰과 엑세스 토큰을 확인하고 관리
// 	useEffect(() => {
// 	  const refreshToken = Cookies.get('refreshToken');
// 	  const accessToken = Cookies.get('accessToken');
  
// 	  if (!refreshToken || !accessToken) {
// 		// 리프레시 토큰 또는 엑세스 토큰이 없으면 로그인 페이지로 이동
// 		navigate('/'); // Login 컴포넌트의 경로에 맞게 수정
// 	  } else {
// 		// 리프레시 토큰과 엑세스 토큰이 모두 존재하면 인증 상태 유지
// 		// TODO: 엑세스 토큰 유효성 검사 로직 구현
// 		// TODO: 만료된 엑세스 토큰은 리프레시 토큰을 사용하여 서버에 새로운 엑세스 토큰 요청
// 	  }
// 	}, []);
  
// 	return (
// 	<Router>
// 		<Routes>
// 			<Route path="/" exact element={<Login />} />
// 			<Route path="/dashboard" element={<Dashboard />} />
// 		</Routes>
// 	</Router>	
// 	);
//   }




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
		<Route path="/signup" element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
} 

export default App;


// import { BrowserRouter as Router, Route } from 'react-router-dom';


// 라우터 추가 전 코드
// function App() {
// 	return (
// 		<div >
// 			<Login />
// 		</div>
// 	);
// }

// export default App;
