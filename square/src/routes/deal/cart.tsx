import { Route, Routes } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Pay from "./pay"




function Cart():JSX.Element {
    return (
        <>
        <header>
        <ArrowBackIcon />
        <div>장바구니</div>
        </header>




        <Routes>
            <Route path="/pay" element={<Pay/>}/>
        </Routes>
        </>
    )

}

export default Cart;