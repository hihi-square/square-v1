import { Route, Routes } from "react-router-dom";
import OrderComplete from "./orderComplete";


function Pay():JSX.Element {
    
    return(
    <>
    <Routes>
        <Route path="/ordercomplete" element={<OrderComplete/>}/>
    </Routes>
    </>
    )

}

export default Pay;