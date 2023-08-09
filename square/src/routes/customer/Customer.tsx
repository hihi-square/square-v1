import React from "react";
import { Routes, Route } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import List from "./list/List";
import StoreListByLocation from "./map/component/storeListByLocation";
import Store from "./store/Store";
import SearchMap from "./map/component/searchMap";
import Board from "./main/board/Board";
import BoardForm from "./main/board/BoardForm";
import Chat from "./chat/chat";
import MyPage from "./my/MyPage";
import SearchResult from "./main/SearchResult";
import Cart from "./deal/Cart";
import Pay from "./deal/Pay";
import OrderList from "./deal/orderList";
import MyArea from "./my/MyArea";
import MyInfo from "./my/MyInfo";
import MyOrderHistory from "./my/MyOrderHistory";
import MyRegular from "./my/MyRegular";
import MyReview from "./my/MyReview";
import MyBoard from "./my/MyBoard";
import Main from "./main/Main";
import Login from "./login/Login";
import Map from "./map/Map";

export default function Customer() {
  return (
    <Grid container xs={12} md={8} justifyContent="center">
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/list/:category" element={<List />} />
        <Route path="/lList/location" element={<StoreListByLocation />} />

        <Route path="/store/:store" element={<Store />} />
        <Route path="/map" element={<Map />} />
        <Route path="/searchmap" element={<SearchMap />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:selectedBoard/:boardId" element={<BoardForm />} />




        <Route path="/chat" element={<Chat />} />

        <Route path="/mypage" element={<MyPage />}/>
        <Route path="/myarea" element={<MyArea />} />
        <Route path="/myinfo" element={<MyInfo />} />
        <Route path="/myorderhistory" element={<MyOrderHistory />} />
        <Route path="/myregular" element={<MyRegular />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/myboard" element={<MyBoard />} />
       
        <Route path="/search/:searchword" element={<SearchResult />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />

        <Route path="/orderlist" element={<OrderList />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Grid>
  );
}
