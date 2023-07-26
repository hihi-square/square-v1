import "./App.css";
import Footer from "./routes/footer";
import Main from "./routes/main";
import BottomSheet from "./routes/BottomSheet";
import StoreList from "./routes/storelist";
import OrderList from "./routes/orderlist";
import Cart from "./routes/cart";
import Pay from "./routes/pay";
import { Routes, Route, Link } from 'react-router-dom'

function App() {
	return (
		<div className="App">
		<Main></Main>
		<Footer />

		<Routes>
  <Route exact path="/" Component={Main}/>
  <Route path="/storelist/:categoryId" Component={StoreList}/>
  <Route path="/orderlist" Component={OrderList}/>
  <Route path="/cart" Component={Cart}/>
  <Route path="/pay" Component={Pay}/>
  <Route path="/ordercomplete" Component={OrderComplete}/>
</Routes>

		</div>

		
	);
}

export default App;

