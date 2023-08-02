import { Route, Routes } from "react-router-dom";
import MainPage from "../main/mainPage";
import Review from "./review";

function PickUpComplete() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/review/:orderId" element={<Review />} />
      </Routes>
    </>
  );
}

export default PickUpComplete;
