import { Route, Routes, Link } from "react-router-dom";
import Category from "./category";
import DiscountNow from "./discountNow";
import Header from "./header";
// import Footer from "./footer";
import StoreListByCategory from "./storeListByCategory";
import StoreListByLocation from "./storeListByLocation";
import SearchMap from "./searchMap";
import Board from "./board/boardMain";
import Chat from "./chat";
import MyPage from "../my/myPage";
import SearchResult from "./searchResult";
import Cart from "../deal/cart";
import Pay from "../deal/pay";
import OrderList from "../deal/orderList";
import MyArea from "../my/myArea";
import MyInfo from "../my/myInfo";
import MyOrderHistory from "../my/myOrderHistory";
import MyRegular from "../my/myRegular";
import MyReview from "../my/myReview";

function MainPage() {
  return (
    <div className="main-container">
      <Header />
      <Category />
      <DiscountNow />
      {/* <Footer /> */}
      <Link to="/storePage">ㅎㅇ</Link>
      <Routes>
        <Route
          path="/storelist/:categoryid"
          element={<StoreListByCategory />}
        />
        <Route path="/storelist/location" element={<StoreListByLocation />} />

        {/* 스토어 아이디 데이터 있기 전까진 일단 그냥 대표페이지로 가게하고 나중에 바인드 */}
        <Route path="/searchmap" element={<SearchMap />} />
        <Route path="/board" element={<Board />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="myarea" element={<MyArea />} />
          <Route path="myinfo" element={<MyInfo />} />
          <Route path="myorderhistory" element={<MyOrderHistory />} />
          <Route path="myregular" element={<MyRegular />} />
          <Route path="myreview" element={<MyReview />} />
        </Route>
        <Route path="/search/:searchword" element={<SearchResult />} />
        <Route path="/cart" element={<Cart />}>
          <Route path="pay" element={<Pay />} />
        </Route>
        <Route path="/orderlist" element={<OrderList />} />
      </Routes>
    </div>
  );
}

export default MainPage;
