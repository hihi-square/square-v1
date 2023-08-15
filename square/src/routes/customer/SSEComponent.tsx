import React, { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useDispatch } from "react-redux";

import { setMessageData, setNoticeData } from "../../redux/redux";

type data = {
  id: number;
  content: string;
  url: string;
  isRead: boolean;
};

function SSEComponent() {
  // 주문데이터와 픽업데이터를 넣어둡니다.
  // const orderData = useSelector((state : RootState) => state.notifications.orderData);
  // const PickUpData = useSelector((state : RootState) => state.notifications.pickUpData);
  const dispatch = useDispatch();
  const EventSource = EventSourcePolyfill;

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
  return <div></div>;
}

export default SSEComponent;
