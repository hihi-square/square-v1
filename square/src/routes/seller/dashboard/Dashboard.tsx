import { Routes, Route, useNavigate } from "react-router-dom";
import { Unstable_Grid2 as Grid, Box, Typography } from "@mui/material";

import Appbar from "./Appbar.js";
import Main from "./main/Main";
// import Product from "./product/Product";
import ProductList from "./product/ProductList";
// import Sale from "./sale/Sale.js";
// import Order from "./order/Order.js";
import "../Seller.css";

export default function Seller() {
  const navigate = useNavigate();

  return (
    <>
      <Grid xs={12}>
        <Appbar />
      </Grid>
      <Grid xs={12} container>
        <Grid xs={2} className="full-size sidebar">
          <Box className="button" sx={{ marginTop: "3%" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700 }}
              onClick={() => {
                navigate("product");
              }}
            >
              상품 관리
            </Typography>
          </Box>
          <Box className="button">
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700 }}
              onClick={() => {
                navigate("sale");
              }}
            >
              세일 관리
            </Typography>
          </Box>
          <Box className="button">
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700 }}
              onClick={() => {
                navigate("order");
              }}
            >
              주문 관리
            </Typography>
          </Box>
          <Box className="button">
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700 }}
            >
              고객 관리
            </Typography>
          </Box>
          <Box className="button">
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700 }}
            >
              피드 관리
            </Typography>
          </Box>
          <Box className="button">
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700 }}
            >
              커뮤니티
            </Typography>
          </Box>
        </Grid>
        <Grid xs={10} className="full-size component-page">
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/product" element={<ProductList />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}
