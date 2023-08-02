import {  Link } from "react-router-dom";
import Category from "./category";
import DiscountNow from "./discountNow";
import Header from "./header";
import Footer from "./footer";

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
