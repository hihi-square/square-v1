import { Route, Routes } from "react-router-dom";
import StorePage from "../store/storePage";
import StoreListByLocation from "./storeListByLocation";

function SearchMap() {
  return (
    <>
      <Routes>
        <Route path="/storelist/:location" element={<StoreListByLocation />} />
        <Route path="/:storeid" element={<StorePage />} />
      </Routes>
    </>
  );
}

export default SearchMap;
