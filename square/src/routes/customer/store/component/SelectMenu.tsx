import React, { useState } from "react";
import { CartItem } from "redux/redux";
import {
  Box,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Paper,
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
  status: string;
  popularity: boolean;
  signature: boolean;
  price: number;
};

interface Props {
  storeId: number;
  storeName: string;
  storeThumbnail: string;
  curItem: Item;
  purchase: boolean;
  setPurchase: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectMenu({
  storeId,
  storeName,
  storeThumbnail,
  curItem,
  purchase,
  setPurchase,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isSame, setSame] = useState<boolean>(false);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (cart.storeId === storeId) {
      handleAddCart();
    } else {
      setSame(true);
    }
  };

  const handleAddCart = () => {
    if (!curItem) {
      return;
    }

    const cartItem: CartItem = {
      storeId,
      storeThumbnail,
      storeName,
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

    if (cart.storeId === storeId) {
      cartItem.items = [...cart.items, ...cartItem.items];
    }

    localStorage.setItem("cart", JSON.stringify(cartItem));
    setSame(false);
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
        <Button
          onClick={() => {
            setPurchase(false);
          }}
        >
          X
        </Button>
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
            <img
              src={menu.menuThumbnail}
              style={{ width: "100%", height: "100%" }}
              alt="menu"
            />
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
          <Button
            onClick={() => {
              setPurchase(false);
              addCart();
            }}
          >
            장바구니에 담기
          </Button>
        </Paper>
      </Paper>
    );

  return (
    <>
      <Dialog open={purchase}>{list(curItem)}</Dialog>
      <Dialog
        open={isSame}
        onClose={() => {
          setSame(false);
        }}
      >
        <DialogTitle>다른 가게의 상품이 담긴 장바구니가 있습니다.</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            장바구니의 상품을 이 가게의 상품으로 바꾸시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSame(false);
            }}
          >
            아니오
          </Button>
          <Button
            onClick={() => {
              handleAddCart();
            }}
          >
            예
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
