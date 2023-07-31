import React from "react";
import "../../App.css";

function DiscountNow(){
	const discounts = [{thumbnail: "", name: "sale1", storeName: "store1", period: 0, discountPrice: 10000}, {thumbnail: "", name: "sale2", storeName: "store2", period: 11, discountPrice: 20000}, {thumbnail: "", name: "sale3", storeName: "store3", period: 3, discountPrice: 30000}];

	return (
		<div className="discountNow">
			<h4>진행중인 할인</h4>
			<div className="discountNow-container">
				{discounts.map((discount, index) => (
					<div className="discount-item" key={index}>
						<img src={discount.thumbnail} alt={discount.name} />
						<div>
							<h4>{discount.name}</h4>
							<h4>{discount.storeName}</h4>
							<h4>{discount.period}</h4>
							<h4>{discount.discountPrice}</h4>
						</div>
					</div>
				))}
			</div>
		</div>

	);
}

export default DiscountNow;
