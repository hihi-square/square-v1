import React from "react";
import { Routes, Route } from "react-router-dom";

import StoreListByCategory from "./main/storeListByCategory";
import StoreListByLocation from "./main/storeListByLocation";
import StorePage from "./store/storePage";
import SearchMap from "./main/searchMap";
import Board from "./main/board/boardMain";
import Chat from "./main/chat";
import MyPage from "./my/myPage";
import SearchResult from "./main/searchResult";
import Cart from "./deal/cart";
import Pay from "./deal/pay";
import OrderList from "./deal/orderList";
import MyArea from "./my/myArea";
import MyInfo from "./my/myInfo";
import MyOrderHistory from "./my/myOrderHistory";
import MyRegular from "./my/myRegular";
import MyReview from "./my/myReview";
import MainPage from "./main/mainPage";

export default function Customer() {
  return (

    <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route
          path="/storelist/:categoryid"
          element={<StoreListByCategory />}
        />
        <Route path="/storelist/location" element={<StoreListByLocation />} />

        {/* 스토어 아이디 데이터 있기 전까진 일단 그냥 대표페이지로 가게하고 나중에 바인드 */}
        <Route path="/storePage" element={<StorePage />} />
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
        <Route path="/cart" element={<Cart />}/>
          <Route path="/pay" element={<Pay />} />
        
        <Route path="/orderlist" element={<OrderList />} />
      </Routes>
   
  );
}
