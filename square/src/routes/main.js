import React from "react";
import Category from "./category";
import DiscountNow from "./discountNow";
import Header from "./header";

function Main() {
	return (
		<div className="main-container">
			<Header />
			<Category></Category>
			<DiscountNow></DiscountNow>

		</div>

		
	);
}

export default Main;
