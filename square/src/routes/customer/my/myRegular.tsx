import { Route, Routes } from "react-router-dom";
import StorePage from "../store/storePage";

function myRegular() {
  return (
    <>
      <Routes>
        <Route path="/store/:storeId" element={<StorePage />} />
      </Routes>
    </>
  );
}

export default myRegular;
