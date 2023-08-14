import React, { useEffect, useState } from 'react';

function SSEComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 서버에 연결
    const eventSource = new EventSource('https://localhost:8811/notification/subscribe');


    eventSource.onopen = (event) => {
      console.log('SSE 연결이 열렸습니다.');
    };

    eventSource.onmessage = (event) => {
      // 여기서 서버에서 보내는 데이터를 받을 수 있습니다.
      setData(event.data);
    };

    eventSource.onerror = (event) => {
      console.error('SSE 연결에 오류가 발생했습니다.', event);
      eventSource.close(); // 오류 발생 시 연결을 종료
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>SSE 데이터 수신</h2>
      <pre>{data}</pre>
    </div>
  );
}

export default SSEComponent;
