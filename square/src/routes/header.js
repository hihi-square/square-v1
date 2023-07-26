import React, {useState, useRef, useEffect} from "react";
import {FaShoppingCart} from "react-icons/fa";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Header() {
	const [selectedOption, setSelectedOption] = useState("");
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const searchButtonRef = useRef();
	const searchInputRef = useRef();

	const handleChange = event => {
		setSelectedOption(event.target.value);
	};
	const handleCartClick = () => {
		// 장바구니 ㄱㄱ
	};
	const handleSearchClick = () => {
		setIsSearchVisible(true);
	};


	useEffect(() => {
		const handleClickOutside = event => {
			if (searchButtonRef.current && !searchButtonRef.current.contains(event.target) && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
				setIsSearchVisible(false);
			}
		};
	
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<header className="App-header">
			<select className="App-header-location" value={selectedOption} onChange={handleChange}>
			{/* 여기에 활동반경 데이터 받아오기 */}
				<option value="loc1">덕명동</option> 
				<option value="loc2">구암동</option>
				<option value="loc3">봉명동</option>
			</select>

			{isSearchVisible && <input type="text" ref={searchInputRef} className="App-header-search" />}

			<button className="App-header-button" ref={searchButtonRef} onClick={handleSearchClick}>
				<FontAwesomeIcon icon={faSearch} />
			</button>
			<button className="App-header-button" onClick={handleCartClick}>
				<FaShoppingCart />
			</button>

		</header>


	);
}

export default Header;
