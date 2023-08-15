import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Unstable_Grid2 as Grid,
  Button,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useDispatch, useSelector } from "react-redux";
import {
  pushOrderData,
  setMessageData,
  setNoticeData,
  RootState,
} from "redux/redux";

import List from "./list/List";
import StoreListByLocation from "./map/component/storeListByLocation";
import Store from "./store/Store";
import Board from "./main/board/Board";
import BoardDetail from "./main/board/BoardDetail";
import Chat from "./chat/chat";
import MyPage from "./my/My";
import Deal from "./deal/Deal";
import Order from "./order/Order";
import MyInfo from "./my/component/MyInfo";
import MyRegular from "./my/component/MyRegular";
import MyReview from "./my/component/MyReview";
import MyBoard from "./my/component/MyBoard";
import Main from "./main/Main";
import Map from "./map/Map";
import Message from "../customer/main/Message";
import MessageForm from "../customer/main/MessageForm";
import Finish from "../customer/deal/Finish";
import PickUp from "../customer/deal/PickUp";
import SSEComponent from "./SSEComponent";
import Error from "./error/Error";

type data = {
  id: number;
  content: string;
  url: string;
  isRead: boolean;
};

export default function Customer() {
  const EventSource = EventSourcePolyfill;
  const dispatch = useDispatch();
  const orderMessage = useSelector(
    (state: RootState) => state.notifications.orderData
  );
  const [orderPopupNumber] = useState<number>(1);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      lastEventId: "",
    };

    const eventSource = new EventSource(
      "https://i9b208.p.ssafy.io:8080/notification/subscribe",
      {
        headers,
        heartbeatTimeout: 180000,
      }
    );

    eventSource.addEventListener("order", (event: any) => {
      handleEvent("order", event);
    });
    eventSource.addEventListener("pickup", (event: any) => {
      handleEvent("pickup", event);
    });
    eventSource.addEventListener("message", (event: any) => {
      handleEvent("message", event);
    });
    eventSource.addEventListener("notice", (event: any) => {
      handleEvent("notice", event);
    });

    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
    };

    eventSource.onmessage = (event) => {
      console.log({ event });
    };

    const handleEvent = (eventName: string, event: any) => {
      console.log(`${eventName} received data:`, event.data);

      try {
        const parsedData: data = JSON.parse(event.data);

        switch (eventName) {
          case "order":
          case "pickup":
            dispatch(pushOrderData(parsedData));
            break;
          case "message":
            dispatch(setMessageData(parsedData));
            break;
          case "notice":
            dispatch(setNoticeData(parsedData));
            break;
          default:
            break;
        }
        console.log(`${eventName}: `, { event });
      } catch (error) {
        console.error(`Failed to parse JSON for ${eventName}:`, error);
      }
    };

    eventSource.onerror = (event) => {
      console.error("SSE 연결에 오류가 발생했습니다.", event);

      setTimeout(() => {
        console.log("SSE 다시 연결 시도중...");
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Grid
      container
      xs={12}
      md={8}
      justifyContent="center"
      sx={{ maxWidth: "600px", height: "100%", backgroundColor: "white" }}
    >
      {orderMessage && orderMessage.length > 0 && (
        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            top: "70px", // 이 부분은 변경하지 않습니다.
            left: "50%",
            transform: "translateX(-50%)", // 가로축만 중앙으로 이동시킵니다.
            zIndex: 10,
          }}
        >
          <Paper
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              width: "80%",
              maxWidth: "500px",
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{
                marginTop: "5px",
                fontWeight: 500,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {orderMessage[orderPopupNumber].content}
            </Typography>
            <Divider></Divider>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                marginTop: "5px",
                fontWeight: 500,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {orderMessage[orderPopupNumber].url}
            </Typography>
            <Grid sx={{ display: "flex", width: "100%" }}>
              <Button sx={{ flexGrow: 1 }}>확인</Button>
              <Button sx={{ flexGrow: 1 }}>닫기</Button>
            </Grid>

            <Grid
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                display: "flex",
                width: "100%",
              }}
            >
              <Button sx={{ flexGrow: 1 }}>{`<`}</Button>
              <Button sx={{ flexGrow: 1 }}>{`>`}</Button>
            </Grid>
          </Paper>
        </Grid>
      )}

      <Routes>
        <Route path="/error" element={<Error />} />
        <Route path="/list/:category" element={<List />} />
        <Route path="/lList/location" element={<StoreListByLocation />} />

        <Route path="/store/:store" element={<Store />} />
        <Route path="/map" element={<Map />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<BoardDetail />} />

        <Route path="/chat" element={<Chat />} />

        <Route path="/order" element={<Order />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myinfo" element={<MyInfo />} />

        <Route path="/myregular" element={<MyRegular />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/myboard" element={<MyBoard />} />
        <Route path="/deal/*" element={<Deal />} />

        <Route path="/pickup" element={<PickUp />} />

        <Route path="/message" element={<Message />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/message/:userId" element={<MessageForm />} />

        <Route path="/test" element={<SSEComponent />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </Grid>
  );
}
