import React, { useState } from "react";
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

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
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
          <Button>장바구니에 담기</Button>
        </Paper>
      </Paper>
    );

  return (
    <Box>
      <Button onClick={toggleDrawer(true)}>ㅎㅇ</Button>
      <SwipeableDrawer
        anchor={"bottom"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list(curItem)}
      </SwipeableDrawer>
    </Box>
  );
}
