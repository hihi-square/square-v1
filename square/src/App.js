import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';


// 라우터 추가 전 코드
// function App() {
// 	return (
// 		<div >
// 			<Login />
// 		</div>
// 	);
// }

// export default App;

function App() {
	return (
	  <Router>
		<Route path="/" exact component={Login} />
		<Route path="/dashboard" component={Dashboard} />
	  </Router>
	);
  }
  
  export default App;