import { Route, Routes ,Link } from "react-router-dom";
import React from "react";
import Category from "./category";
import DiscountNow from "./discountNow";
import Header from "./header";
import StorePage from "../store/storePage";
// import Footer from "./footer";
import Main from "./mainPage";
import StoreListByCategory from "./storeListByCategory";
// import StorePage from "../store/storePage";



function MainPage(): JSX.Element {
	return (
		<div className="main-container">
			
			<Header />
			<Category/>
			<DiscountNow/>

			{/* <Footer /> */}
		<Link to="routes/store/storePage">ㅎㅇ</Link>
			<Routes>
  				<Route path="/" element={<Main/>}/>
  				<Route path="/storelist/:categoryid" element={<StoreListByCategory/>}/>
  				<Route path="/storePage" element={<StorePage/>}/>
				
			</Routes>	
		</div>

	);
}

export default MainPage;
