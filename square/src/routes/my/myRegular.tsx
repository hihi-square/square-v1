import { Route, Routes } from "react-router-dom";
import StorePage from "../store/storePage";


function myRegular(): JSX.Element {

    return(
    <>
    <Routes>
        <Route path="/store/:storeId" element={<StorePage/>}/>
    </Routes>
    </>
    )

}

export default myRegular;