import React, { useState } from "react";
import StoreMenu from "./components/storeMenu";
import StoreFeed from "./components/storeFeed";
import StoreReview from "./components/storeReview";
import StoreInfo from "./components/storeInfo";


function StorePage() {
  const [selectedTab, setSelectedTab] = useState("menu");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "menu":
        return <StoreMenu />;
      case "info":
        return <StoreFeed />;
      case "review":
        return <StoreReview />;
      default:
        return <StoreMenu />;
    }
  };

  return (
    <>
      <StoreInfo />
      <div className="button-container">
        <button onClick={() => setSelectedTab("menu")}>메뉴</button>
        <button onClick={() => setSelectedTab("info")}>정보</button>
        <button onClick={() => setSelectedTab("review")}>리뷰</button>
        {selectedTab}
      </div>
      <div>{renderTabContent()}</div>

    </>
  );
}

export default StorePage;
