import {  Route, Routes } from "react-router-dom";
import "./App.css";
import StorePage from "./routes/store/storePage";
import Cart from "./routes/deal/cart";
import Pay from "./routes/deal/pay";



function App() {
	return (
		<div className="App">
		<Routes>
			<Route path="/" element={<StorePage/>}/>
			<Route path="/deal/cart" element={<Cart/>}/>
			<Route path="/deal/cart/pay" element={<Pay/>}/>
		</Routes>
		
		</div>
	
	);
}

export default App;

