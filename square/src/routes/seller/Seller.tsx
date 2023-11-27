import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Unstable_Grid2 as Grid, Box, Typography } from "@mui/material";

import Appbar from "./dashboard/Appbar";
import Main from "./main/Main";
import ProductList from "./dashboard/product/ProductList";
import Feed from "./dashboard/feed/Feed";
// import Sale from "./sale/Sale.js";
import Order from "./dashboard/order/Order";
import Community from "./dashboard/community/Community";
import CommunityDetail from "./dashboard/community/CommunityDetail";
import CommunityForm from "./dashboard/community/CommunityForm";
import "./Seller.css";

const menus = [
  ["가게 관리", ""],
  ["상품 관리", "product"],
  ["주문 관리", "order"],
  ["피드 관리", "feed"],
  ["커뮤니티", "community"],
];

export default function Seller() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);

  return (
    <Grid xs={12} container sx={{ height: "100vh", flexDirection: "column" }}>
      <Appbar />
      <Grid xs={12} container sx={{ flex: 1, flexDirection: "row" }}>
        <Grid
          xs={2}
          sx={{
            backgroundColor: "#225a41",
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: "70px",
            height: "calc(100vh - 70px)",
          }}
        >
          {menus.map((menu, idx) => (
            <Box
              onClick={() => {
                setPage(idx);
                navigate(menu[1]);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: idx === page ? "white" : "primary",
                height: "10vh",
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: "30px",
                  textAlign: "center",
                  color: idx === page ? "primary" : "white",
                }}
              >
                {menu[0]}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid
          xs={10}
          container
          sx={{
            overflowY: "scroll",
            justifyContent: "center",

            backgroundImage: "url(/img/MobileBG.png)",
            height: "calc(100vh - 70px)",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          {/* Routes 내용 */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route
              path="/community/write"
              element={<CommunityForm mode="write" />}
            />
            <Route
              path="/community/update/:id"
              element={<CommunityForm mode="update" />}
            />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}
