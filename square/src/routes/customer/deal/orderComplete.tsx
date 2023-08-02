import { Route, Routes } from "react-router-dom";
import MainPage from "../main/mainPage";

function OrderComplete() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default OrderComplete;
