import React from "react";
import { Routes, Route } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import List from "./list/List";
import StoreListByLocation from "./map/component/storeListByLocation";
import Store from "./store/Store";
import SearchMap from "./map/component/MapLayer";
import Board from "./main/board/boardMain";
import Chat from "./chat/chat";
import MyPage from "./my/myPage";
import SearchResult from "./list/searchResult";
import Cart from "./deal/cart";
import Pay from "./deal/pay";
import OrderList from "./deal/orderList";
import MyArea from "./my/myArea";
import MyInfo from "./my/myInfo";
import MyOrderHistory from "./my/myOrderHistory";
import MyRegular from "./my/myRegular";
import MyReview from "./my/myReview";
import Main from "./main/Main";
import Login from "./login/Login";
import Map from "./map/Map";

export default function Customer() {
  return (
    <Grid
      container
      xs={11}
      md={8}
      justifyContent="center"
      sx={{ maxWidth: "600px", backgroundColor: "#FAFAFA" }}
    >
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/list/:category" element={<List />} />
        <Route path="/lList/location" element={<StoreListByLocation />} />

        {/* 스토어 아이디 데이터 있기 전까진 일단 그냥 대표페이지로 가게하고 나중에 바인드 */}
        <Route path="/store/:store" element={<Store />} />
        <Route path="/map" element={<Map />} />
        <Route path="/searchmap" element={<SearchMap />} />
        <Route path="/board" element={<Board />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/mypage" element={<MyPage />}>
          <Route path="myarea" element={<MyArea />} />
          <Route path="myinfo" element={<MyInfo />} />
          <Route path="myorderhistory" element={<MyOrderHistory />} />
          <Route path="myregular" element={<MyRegular />} />
          <Route path="myreview" element={<MyReview />} />
        </Route>
        <Route path="/search/:searchword" element={<SearchResult />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />

        <Route path="/orderlist" element={<OrderList />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Grid>
  );
}
