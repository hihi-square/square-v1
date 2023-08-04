import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Pay() {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = location.state?.menu;

  const [showMessage, setShowMessage] = useState(false); // 메시지 표시 여부 상태

  const handleOrderComplete = () => {
    setShowMessage(true); // 메시지 표시
  };

  const goBack = () => {
    const previousState = location.state?.from;

    if (previousState) {
      navigate(previousState);
    } else {
      navigate(-1);
    }
  };

 
  return (
    <>
      <ArrowBackIcon onClick={goBack} />
      {showMessage && ( // 조건부 렌더링으로 메시지 표시
        <div style={{ /* 스타일링 */ }}>
          주문이 완료되었습니다.
        </div>
      )}
      <div>
        <h2>{menu?.menuName}</h2>
        <p>{menu?.menuDescription}</p>
        <p>{menu?.price}원</p>
      </div>
      <button onClick={handleOrderComplete}>주문 완료</button>
    </>
  );
}

export default Pay;