import { Routes, Route, useNavigate } from "react-router-dom";
import { Unstable_Grid2 as Grid, Box, Typography } from "@mui/material";

import Appbar from "./Appbar.js";
import Main from "./main/Main";
// import Product from "./product/Product";
import ProductList from "./product/ProductList";
// import Sale from "./sale/Sale.js";
import Order from "./order/Order";
import "../Seller.css";

export default function Seller() {
  const navigate = useNavigate();

  return (
    <Grid
      xs={12}
      container
      flexDirection="column"
      sx={{ width: "1500px", height: "auto" }}
    >
      <Appbar />
      <Grid xs={12} container>
        <Grid xs={2} className="sidebar">
          <Box
            className="button"
            onClick={() => {
              navigate("");
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700, textAlign: "center" }}
            >
              가게 관리
            </Typography>
          </Box>
          <Box
            className="button"
            sx={{ marginTop: "3%" }}
            onClick={() => {
              navigate("product");
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700, textAlign: "center" }}
            >
              상품 관리
            </Typography>
          </Box>
          <Box
            className="button"
            onClick={() => {
              navigate("sale");
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700, textAlign: "center" }}
            >
              세일 관리
            </Typography>
          </Box>
          <Box
            className="button"
            onClick={() => {
              navigate("order");
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700, textAlign: "center" }}
            >
              주문 관리
            </Typography>
          </Box>
          <Box className="button">
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700, textAlign: "center" }}
            >
              피드 관리
            </Typography>
          </Box>
        </Grid>
        <Grid
          xs={10}
          container
          className="component-page"
          sx={{ overflow: "auto" }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product" element={<ProductList />} />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}
