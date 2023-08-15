import React, { useEffect } from 'react';
import { EventSourcePolyfill } from "event-source-polyfill";
import { useDispatch } from 'react-redux';
import { setOrderData, setPickUpData, setMessageData, setNoticeData } from '../../redux/redux';

type data = {
  id: number,
  content: string,
  url: string,
  isRead: boolean
}

function SSEComponent() {

  const dispatch = useDispatch();



  const EventSource = EventSourcePolyfill;


  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      lastEventId: ""
    };

    const eventSource = new EventSource('https://i9b208.p.ssafy.io:8080/notification/subscribe', {
      headers
    });

    eventSource.onopen = (event) => {
      console.log('SSE 연결이 열렸습니다.');
    };

    eventSource.onmessage = (event) => {

      console.log({event});
    };

     const handleEvent = (eventName: string, event: any) => {
    console.log(`${eventName} received data:`, event.data);

    try {
      const parsedData: data = JSON.parse(event.data);

      switch (eventName) {
        case 'order':
          dispatch(setOrderData(parsedData));
          break;
        case 'pickup':
          dispatch(setPickUpData(parsedData));
          break;
        case 'message':
          dispatch(setMessageData(parsedData));
          break;
        case 'notice':
          dispatch(setNoticeData(parsedData));
          break;
        default:
          break;
      }
      console.log(`${eventName}: `, {event});
    } catch (error) {
      console.error(`Failed to parse JSON for ${eventName}:`, error);
    }
  };

  eventSource.addEventListener('order', (event: any) =>{
    console.log("Order event received:", event.data);
   handleEvent('order', event)});
  eventSource.addEventListener('pickup', (event: any) =>{ 
    console.log("PickUp event received:", event.data);
    handleEvent('pickup', event)});
  eventSource.addEventListener('message', (event: any) => {
    console.log("Message event received:", event.data);
    handleEvent('message', event)});
  eventSource.addEventListener('notice', (event: any) => {
    console.log("Notice event received:", event.data);
    handleEvent('notice', event)});



    eventSource.onerror = (event) => {
      console.error('SSE 연결에 오류가 발생했습니다.', event);

      setTimeout(() => {
        console.log('SSE 다시 연결 시도중...');
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div>
      
  </div>
  );
}

export default SSEComponent;