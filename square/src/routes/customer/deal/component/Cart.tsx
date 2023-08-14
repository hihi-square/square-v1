/* eslint-disable no-console */
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import axios from 'axios';
import {
  Unstable_Grid2 as Grid,
  Box,
  Button,
  Checkbox,
  Divider,
  Typography,
} from "@mui/material";

import { CartItem } from "redux/redux";
import Header from "./Header";

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

  const handleDelete = (index: number) => {
    const cartItems = [...cartItem.items];

    cartItems.splice(index, 1);
    const newCartItem = { ...cartItem, items: cartItems };

    localStorage.setItem("cart", JSON.stringify(newCartItem));
    setCartItem(newCartItem);
  };

  return (
    <Grid container xs={12} justifyContent="center">
      <Header page="장바구니" />
      <Grid xs={12} sx={{ height: "70px" }}></Grid>
      <Grid container xs={10} flexDirection="column">
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
                <Grid
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
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
                        variant="h5"
                        component="h5"
                        sx={{
                          fontWeight: 700,
                          textAlign: "center",
                          color: "primary.main",
                          width: "100%",
                          marginTop: "10px",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {item.productName}
                      </Typography>
                    </Grid>

                    <Grid xs={8}>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          fontWeight: 500,
                          textAlign: "left",
                          color: "grey",
                          width: "100%",
                          marginTop: "10px",
                          marginLeft: "30px",
                        }}
                      >
                        상품명
                      </Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          fontWeight: 500,
                          textAlign: "center",
                          color: "grey",
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        갯수
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          fontWeight: 500,
                          textAlign: "left",
                          color: "grey",
                          width: "100%",
                          marginTop: "10px",
                          marginLeft: "30px",
                        }}
                      >
                        {item.price}
                      </Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          onClick={() =>
                            handleQuantityChange(index, "subtract")
                          }
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
                    <Grid xs={12} sx={{ padding: 1 }}>
                      <Divider></Divider>
                    </Grid>
                    <Grid xs={12} container>
                      <Grid
                        xs={8}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{
                            fontWeight: 700,
                            textAlign: "left",
                            color: "grey",
                            width: "100%",
                            marginLeft: "20px",
                          }}
                        >
                          총 가격: {item.price * item.quantity} 원
                        </Typography>
                      </Grid>
                      <Grid
                        xs={2}
                        sx={{ display: "flex", justifyContent: "end" }}
                      >
                        <Checkbox
                          color="primary"
                          checked={item.isChecked}
                          onChange={(e) =>
                            handleCheckboxChange(index, e.target.checked)
                          }
                        />
                      </Grid>
                      <Grid
                        xs={2}
                        sx={{ display: "flex", justifyContent: "end" }}
                      >
                        <Button
                          color="primary"
                          onClick={() => handleDelete(index)}
                        >
                          X
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid xs={12} sx={{ height: 80 }}></Grid>
            <Grid
              xs={10}
              sx={{
                position: "fixed",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                maxWidth: "600px",
                height: 70,
              }}
            >
              <Button
                onClick={handleOrderClick}
                variant="contained"
                sx={{ width: "100%", height: "50px" }}
              >
                <Grid
                  container
                  sx={{ justifyContent: "space-around", width: "100%" }}
                >
                  <Grid xs={3}>
                    {cartItem.items.filter((item) => item.isChecked).length}{" "}
                    항목
                  </Grid>
                  <Grid xs={6}>
                    {cartItem.items.reduce(
                      (total: number, item: any) =>
                        item.isChecked
                          ? total + item.price * item.quantity
                          : total,
                      0
                    )}
                    원
                  </Grid>
                  <Grid xs={3}>주문하기</Grid>
                </Grid>
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid> 장바구니 정보가 없습니다. </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Cart;
