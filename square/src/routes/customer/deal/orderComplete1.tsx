import { Route, Routes } from "react-router-dom";
import MainPage from "../main/Main";

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
