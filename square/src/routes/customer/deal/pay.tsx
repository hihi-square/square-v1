import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Pay() {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = location.state?.menu; // 이전 컴포넌트에서 전달한 메뉴 정보

  const goBack = () => {
    const previousState = location.state?.from;

    if (previousState) {
      navigate(previousState);
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <ArrowBackIcon onClick={goBack} />
      <div>
        {/* 여기에 메뉴 정보를 띄우면 됩니다. */}
        <h2>{menu?.menuName}</h2>
        <p>{menu?.menuDescription}</p>
        <p>{menu?.price}원</p>
      </div>
    </>
  );
}

export default Pay;
