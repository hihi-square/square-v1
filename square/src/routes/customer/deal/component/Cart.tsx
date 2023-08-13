/* eslint-disable no-console */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from 'axios';
import {
  Unstable_Grid2 as Grid,
  Box,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";

import { CartItem } from "redux/redux";

function Cart() {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState<CartItem>(
    JSON.parse(localStorage.getItem("cart") || "{}")
  );

  const handleOrderClick = () => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
    console.log(cartItem);
    navigate("/deal/pay", { state: cartItem });
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
    <Grid container xs={12} flexDirection="column">
      {cartItem && cartItem.items ? (
        <Grid container xs={12}>
          <Grid container xs={12}>
            <Grid xs={4}>
              {" "}
              <img src={cartItem.storeThumbnail} alt="썸네일" />
            </Grid>
            <Grid xs={8}>{cartItem.storeName}</Grid>
          </Grid>
          {cartItem.items.map((item, index) => (
            <Grid
              xs={12}
              container
              key={index}
              sx={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
              }}
            >
              <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={item.productThumbnail}
                  style={{ width: "200px", height: "200px" }}
                  alt="썸네일"
                />
              </Grid>
              <Grid xs={12} container flexDirection="column">
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: 400,
                        textAlign: "left",
                        color: "secondary.main",
                        padding: "0px 5px 10px 20px",
                        width: "90%",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.productName}
                    </Typography>
                  </Grid>
                  <Grid xs={8}>{item.price}</Grid>
                  <Grid xs={4}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        onClick={() => handleQuantityChange(index, "subtract")}
                      >
                        -
                      </Button>
                      <div>{item.quantity}</div>
                      <Button
                        onClick={() => handleQuantityChange(index, "add")}
                      >
                        +
                      </Button>
                    </Box>
                  </Grid>
                  <Grid xs={12} container>
                    <Grid xs={8}>총 가격: {item.price * item.quantity}</Grid>
                    <Grid xs={4}>
                      <Checkbox
                        color="primary"
                        checked={item.isChecked}
                        onChange={(e) =>
                          handleCheckboxChange(index, e.target.checked)
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
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
        </Grid>
      ) : (
        <div></div>
      )}
    </Grid>
  );
}

export default Cart;
