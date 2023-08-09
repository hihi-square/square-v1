import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CartItem, Choice, RootState } from "redux/redux";
import {
  Box,
  Button,
  Divider,
  Paper,
  SwipeableDrawer,
  Typography,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

type Item = {
  menuId: number;
  menuName: string;
  menuThumbnail: string;
  menuImage: string;
  description: string;
  status: number;
  popularity: boolean;
  signature: boolean;
  price: number;
};

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  curItem: Item | undefined;
}

export default function SelectMenu({ state, curItem, setState }: Props) {
  const [quantity, setQuantity] = useState(1);
  const choice: Choice = useSelector((s: RootState) => s.choice);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddCart = () => {
    if (!curItem) {
      return;
    }

    const cartItem: CartItem = {
      storeId: choice.storeId,
      storeThumbnail: choice.storeThumbnail,
      storeName: choice.storeName,
      items: [
        {
          productId: curItem.menuId,
          productThumbnail: curItem.menuThumbnail,
          productName: curItem.menuName,
          price: curItem.price,
          options: [], // 현재 데이터에서 options에 대한 정보가 없으므로 빈 배열로 초기화
          quantity,
          isChecked: true,
        },
      ],
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (cart.storeId === cartItem.storeId) {
      cartItem.items = [...cart.items, ...cartItem.items];
    }

    localStorage.setItem("cart", JSON.stringify(cartItem));
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const list = (menu: Item | undefined) =>
    menu && (
      <Paper
        sx={{
          width: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Button onClick={toggleDrawer(false)}>X</Button>
        <Paper
          sx={{
            width: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "80%",
              height: "auto",
              "& img": {
                width: "100%",
                height: "auto",
              },
            }}
          >
            <img src={menu.menuImage} alt="menu" />
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                fontWeight: 700,
                color: "black",
                textAlign: "left",
                padding: "10px 0px 4px 20px",
                width: "90%",
                whiteSpace: "pre-line",
              }}
            >
              {menu.menuName}
            </Typography>
          </Box>
          <Box>
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
              {menu.description}
            </Typography>
          </Box>
        </Paper>
        <Divider></Divider>
        <Paper
          sx={{
            width: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box>
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
              이곳은 옵션이 들어갈 자리입니다.
            </Typography>
          </Box>
          <Grid container justifyContent="center">
            <Grid xs={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button onClick={handleDecrease}>-</Button>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  sx={{ width: "50px", textAlign: "center" }}
                />
                <Button onClick={handleIncrease}>+</Button>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  fontWeight: 400,
                  textAlign: "right",
                  color: "primary.main",
                  width: "90%",
                  whiteSpace: "pre-line",
                }}
              >
                {menu.price * quantity}원
              </Typography>
            </Grid>
          </Grid>
          <Button onClick={handleAddCart}>장바구니에 담기</Button>
        </Paper>
      </Paper>
    );

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {list(curItem)}
    </SwipeableDrawer>
  );
}
