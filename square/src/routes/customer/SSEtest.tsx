import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/redux'; // 실제 store 모듈의 경로로 수정하세요


function SSEtest() {
    // Redux 스토어의 상태 가져오기
    const orderDataState = useSelector((state: RootState) => state.notifications.orderData);  
    const pickUpDataState = useSelector((state: RootState) => state.notifications.pickUpData);
    const messageDataState = useSelector((state: RootState) => state.notifications.messageData);
    const noticeDataState = useSelector((state: RootState) => state.notifications.noticeData);
   // 나머지 데이터도 동일한 방식으로 가져옵니다...

    return (
        <>
            <h2>SSE 데이터 수신</h2>
            <pre>2  ID: {orderDataState?.id} Content: {orderDataState?.content} URL: {orderDataState?.url} IsRead: {orderDataState?.isRead}</pre>
            <pre>3  ID: {pickUpDataState?.id} Content: {pickUpDataState?.content} URL: {pickUpDataState?.url} IsRead: {pickUpDataState?.isRead}</pre>
            <pre>4  ID: {messageDataState?.id} Content: {messageDataState?.content} URL: {messageDataState?.url} IsRead: {messageDataState?.isRead}</pre>
            <pre>5  ID: {noticeDataState?.id} Content: {noticeDataState?.content} URL: {noticeDataState?.url} IsRead: {noticeDataState?.isRead}</pre>
        </>
    );
}

export default SSEtest;
