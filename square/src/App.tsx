import {  Route, Routes } from "react-router-dom";
import MainPage from "routes/main/mainPage";
import "./App.css";




function App() {
	return (
		<div className="App">


		<Routes>
			<Route path="/" element={<MainPage/>}/>
		</Routes>
		
		</div>
	
	);
}

export default App;

