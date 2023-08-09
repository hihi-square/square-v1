/* eslint-disable no-console */
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
// import axios from 'axios';
import { Box, Button, Checkbox } from "@mui/material";

import { CartItem } from "redux/redux";

function Cart() {
  const location = useLocation();

  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState<CartItem>(
    JSON.parse(localStorage.getItem("cart") || "{}")
  );

  const handleOrderClick = () => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
    navigate("/pay", { state: cartItem });
  };

  const handleQuantityChange = (index: number, action: "add" | "subtract") => {
    const cartItems = [...cartItem.items];

    if (action === "add") {
      cartItems[index].quantity += 1;
    } else if (action === "subtract" && cartItems[index].quantity > 0) {
      cartItems[index].quantity -= 1;
    }

    const newCartItem = { ...cartItem, items: cartItems };

    setCartItem(newCartItem);
  };

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const cartItems = [...cartItem.items];

    cartItems[index].isChecked = isChecked;

    const newCartItem = { ...cartItem, items: cartItems };

    setCartItem(newCartItem);
  };

  const goBack = () => {
    const previousState = location.state?.from;

    if (previousState) {
      navigate(previousState);
    } else {
      navigate(-1);
    }
  };

  const paymentButtonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    fontSize: "18px",
    borderRadius: "10px",
    margin: "0 auto",
  };

  return (
    <>
      <header>
        <ArrowBackIcon onClick={goBack} />
        장바구니
      </header>
      {cartItem && cartItem.items ? (
        <>
          <div>
            <div className="cart">
              <div>{cartItem.storeName}</div>
              <img src={cartItem.storeThumbnail} alt="썸네일" />
              {cartItem.items.map((item, index) => (
                <div
                  key={index}
                  className="store"
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  {" "}
                  <img src={item.productThumbnail} alt="썸네일" />
                  <div>{item.productName}</div>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      onClick={() => handleQuantityChange(index, "subtract")}
                    >
                      -
                    </Button>
                    <div>{item.quantity}</div>
                    <Button onClick={() => handleQuantityChange(index, "add")}>
                      +
                    </Button>
                  </Box>
                  <div>{item.price}</div>
                  <div>총 가격: {item.price * item.quantity}</div>
                  <Checkbox
                    color="primary"
                    checked={item.isChecked}
                    onChange={(e) =>
                      handleCheckboxChange(index, e.target.checked)
                    }
                  />
                </div>
              ))}
            </div>
            <p>가게 총 가격: 원</p>
            <button onClick={handleOrderClick} style={paymentButtonStyle}>
              <div>
                {cartItem.items.filter((item) => item.isChecked).length} 항목
              </div>
              <div>주문하기</div>
              <div>
                {" "}
                {cartItem.items.reduce(
                  (total: number, item: any) =>
                    item.isChecked ? total + item.price * item.quantity : total,
                  0
                )}
                원
              </div>
            </button>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Cart;
