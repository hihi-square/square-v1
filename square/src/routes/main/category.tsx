import React from "react";
import "../../App.css";

function Category(): JSX.Element {
	const categories = Array.from({length: 15}, (_, i) => `${i + 1}`);

	return (
		<div>
			<h4>카테고리별</h4>
			<div className="category-container">
				{categories.map((category, index) => (
					<button className="category-button" key={index}>
						{category}
					</button>
				))}
			</div>
		</div>

	);
}

export default Category;
