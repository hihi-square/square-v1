/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import Store from "./store/Store";
import Board from "./main/board/Board";
import BoardForm from "./main/board/BoardForm";
import BoardDetail from "./main/board/BoardDetail";
import Chat from "./chat/chat";
import MyPage from "./my/My";
import Deal from "./deal/Deal";
import Order from "./order/Order";
import MyInfo from "./my/component/MyInfo";
import MyRegular from "./my/component/MyRegular";
import MyReview from "./my/component/MyReview";
import MyBoard from "./my/component/MyBoard";
import MyDibs from "./my/component/MyDibs";
import Main from "./main/Main";
import Map from "./map/Map";
import Message from "../customer/main/Message";
import MessageForm from "../customer/main/MessageForm";
import Finish from "../customer/deal/Finish";
import PickUp from "../customer/deal/PickUp";
import Error from "./error/Error";

type data = {
  id: number;
  content: string;
  storeName: string;
  isRead: boolean;
};

export default function Customer() {
  const token = sessionStorage.getItem("accessToken");
  const userInfo = sessionStorage.getItem("userInfo");
  const navigate = useNavigate();
  const EventSource = EventSourcePolyfill;
  const dispatch = useDispatch();
  const orderMessage = useSelector(
    (state: RootState) => state.notifications.orderData
  );
  const [orderPopupNumber, setOrderPopupNumber] = useState<number>(0);

  useEffect(() => {
    if (!token || !userInfo) {
      navigate("/login");
      return undefined;
    } else {
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

      const handleEvent = (eventName: string, event: any) => {
        console.log(`${eventName} received data:`, event.data);

        try {
          const parsedData: data = JSON.parse(event.data);

          console.log(parsedData);
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
    }
  }, []);

  const handlePopup = (index: number) => {
    const length = orderMessage.length;

    setOrderPopupNumber((orderPopupNumber + index + length) % length);
  };

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      sx={{
        maxWidth: "600px",
        height: "100%",
        backgroundImage: "url(/img/MobileBG.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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

            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                marginTop: "5px",
                fontWeight: 400,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {orderMessage[orderPopupNumber].storeName}
            </Typography>
            <Divider sx={{ margin: "10px" }}></Divider>
            <Grid sx={{ display: "flex", width: "100%" }}>
              <Button sx={{ flexGrow: 1 }}>확인</Button>
              <Button sx={{ flexGrow: 1 }}>닫기</Button>
            </Grid>

            {orderMessage.length > 1 && (
              <Grid
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  width: "10%",
                }}
              >
                <Button
                  onClick={() => {
                    handlePopup(1);
                  }}
                >{`>`}</Button>
              </Grid>
            )}

            {orderMessage.length > 1 && (
              <Grid
                sx={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  width: "10%",
                }}
              >
                <Button
                  onClick={() => {
                    handlePopup(1);
                  }}
                >{`<`}</Button>
              </Grid>
            )}
          </Paper>
        </Grid>
      )}

      <Routes>
        <Route path="/error" element={<Error />} />
        <Route path="/list/:query" element={<List />} />

        <Route path="/store/:store" element={<Store />} />
        <Route path="/main" element={<Main />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/write" element={<BoardForm mode="write" />} />
        <Route path="/board/update/:id" element={<BoardForm mode="update" />} />
        <Route path="/board/:id" element={<BoardDetail />} />

        <Route path="/chat" element={<Chat />} />

        <Route path="/order" element={<Order />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myinfo" element={<MyInfo />} />
        <Route path="/mydibs" element={<MyDibs />} />

        <Route path="/myregular" element={<MyRegular />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/myboard" element={<MyBoard />} />
        <Route path="/deal/*" element={<Deal />} />

        <Route path="/pickup" element={<PickUp />} />

        <Route path="/message" element={<Message />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/message/:userId" element={<MessageForm />} />

        <Route path="/*" element={<Map />} />
      </Routes>
    </Grid>
  );
}
