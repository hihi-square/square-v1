import React from "react";
import { Routes, Route } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import List from "./list/List";
import StoreListByLocation from "./map/component/storeListByLocation";
import Store from "./store/Store";
import Board from "./main/board/Board";
import BoardForm from "./main/board/BoardForm";
import Chat from "./chat/chat";
import MyPage from "./my/My";
import Deal from "./deal/Deal";
import Order from "./order/Order";
import MyInfo from "./my/component/MyInfo";
import MyRegular from "./my/component/MyRegular";
import MyReview from "./my/component/MyReview";
import MyBoard from "./my/component/MyBoard";
import Main from "./main/Main";
import Login from "./login/Login";
import Map from "./map/Map";
import CustomerSignUp from "./login/CustomerSignup";
import KakaoRedirect from "./login/KakaoRedirect";
import NaverRedirect from "./login/NaverRedirect";
import GoogleRedirect from "./login/GoogleRedirect";
import Message from "../customer/main/Message";
import MessageForm from "../customer/main/MessageForm";
import Finish from "../customer/deal/Finish";
import PickUp from "../customer/deal/PickUp";
import SSEComponent from "./SSEComponent";
import Error from "./error/Error";

export default function Customer() {
  return (
    <Grid
      container
      xs={12}
      md={8}
      justifyContent="center"
      sx={{ maxWidth: "600px", height: "100%", backgroundColor: "white" }}
    >
      <Routes>
        <Route path="/error" element={<Error />} />
        <Route path="/list/:category" element={<List />} />
        <Route path="/lList/location" element={<StoreListByLocation />} />

        <Route path="/store/:store" element={<Store />} />
        <Route path="/map" element={<Map />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:selectedBoard/:boardId" element={<BoardForm />} />

        <Route path="/chat" element={<Chat />} />

        <Route path="/order" element={<Order />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myinfo" element={<MyInfo />} />

        <Route path="/myregular" element={<MyRegular />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/myboard" element={<MyBoard />} />
        <Route path="/deal/*" element={<Deal />} />

        <Route path="/pickup" element={<PickUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CustomerSignUp />} />
        <Route path="/login/KakaoRedirect" element={<KakaoRedirect />} />
        <Route path="/login/GoogleRedirect" element={<GoogleRedirect />} />
        <Route path="/login/NaverRedirect" element={<NaverRedirect />} />
        <Route path="/message" element={<Message />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/message/:userId" element={<MessageForm />} />

        <Route path="/test" element={<SSEComponent />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </Grid>
  );
}
