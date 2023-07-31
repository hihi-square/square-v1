import { Route, Routes } from "react-router-dom";
import StorePage from "../store/storePage";

function StoreListByCategory(): JSX.Element {

    return(
    <>
    <Routes>
        <Route path="/:storeid" element={<StorePage/>}/>
    </Routes>
    </>
    )
}

export default StoreListByCategory;