import {  Link } from "react-router-dom";
import Category from "./component/category";
import DiscountNow from "./component/discountNow";
import Header from "./component/header";
import Footer from "./component/footer";

function MainPage() {
  return (
    <div className="main-container">
      <Header />
      <Category />
      <Link to="/storePage">ㅎㅇ</Link>
      <DiscountNow />
      <Footer />
    
  
    </div>
  );
}

export default MainPage;
