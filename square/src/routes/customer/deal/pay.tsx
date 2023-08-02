import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OrderComplete from "./orderComplete";

function Pay() {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    const previousState = location.state?.from;

    if (previousState) {
      navigate(previousState);
    } else {
      navigate("/deal/cart");
    }
  };

  return (
    <>
      <ArrowBackIcon onClick={goBack} />
      <Routes>
        <Route path="/ordercomplete" element={<OrderComplete />} />
      </Routes>
    </>
  );
}

export default Pay;
