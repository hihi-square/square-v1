import React from "react";
import { Routes, Route } from "react-router-dom";

import StoreListByCategory from "./main/storeListByCategory";
import StoreListByLocation from "./main/storeListByLocation";
import StorePage from "./store/storePage";
import SearchMap from "./main/searchMap";
import Board from "./main/board/boardMain";
import Chat from "./main/chat";
import MyPage from "./my/MyPage";
import SearchResult from "./main/searchResult";
import Cart from "./deal/cart";
import Pay from "./deal/pay";
import OrderList from "./deal/orderList";
import MyArea from "./my/MyArea";
import MyInfo from "./my/MyInfo";
import MyOrderHistory from "./my/MyOrderHistory";
import MyRegular from "./my/MyRegular";
import MyReview from "./my/MyReview";
import MyBoard from "./my/MyBoard";
import MainPage from "./main/mainPage";

export default function Customer() {
  return (

    <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route
          path="/storelist/:category"
          element={<StoreListByCategory />}
        />
        <Route path="/storelist/location" element={<StoreListByLocation />} />
        <Route path="/storePage/:store" element={<StorePage />} />
        <Route path="/searchmap" element={<SearchMap />} />
        <Route path="/board" element={<Board />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mypage" element={<MyPage />}/>
          <Route path="/myarea" element={<MyArea />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/myorderhistory" element={<MyOrderHistory />} />
          <Route path="/myregular" element={<MyRegular />} />
          <Route path="/myreview" element={<MyReview />} />
          <Route path="/myboard" element={<MyBoard />} />
       
        <Route path="/search/:searchword" element={<SearchResult />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/pay" element={<Pay />} />
        
        <Route path="/orderlist" element={<OrderList />} />
      </Routes>
   
  );
}
