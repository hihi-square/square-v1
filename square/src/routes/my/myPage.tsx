import { Route, Routes } from "react-router-dom";
import MyInfo from "./myInfo";
import MyArea from "./myArea";
import MyOrderHistory from "./myOrderHistory";
import MyReview from "./myReview";
import Myregular from "./myRegular";



function MyPage(): JSX.Element {
    return(

        
        <>
        <Routes>
            <Route path="/mypage/myinfo" element={<MyInfo/>}/>
            <Route path="/mypage/myarea" element={<MyArea/>}/>
            <Route path="/mypage/myorderhistory" element={<MyOrderHistory/>}/>
            <Route path="/mypage/myreview" element={<MyReview/>}/>
            <Route path="/mypage/myregular" element={<Myregular/>}/>
            

        </Routes>
        </>
    )

}

export default MyPage;