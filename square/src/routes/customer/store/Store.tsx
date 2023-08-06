import React, { useState } from "react";
import { useParams } from "react-router-dom"; // useParams를 import합니다.
import StoreMenu from "./components/storeMenu";
import StoreFeed from "./components/storeFeed";
import StoreReview from "./components/storeReview";
import StoreInfo from "./components/storeInfo";

function StorePage() {
  const { store } = useParams<{ store?: string }>();
  const [selectedTab, setSelectedTab] = useState("menu");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "menu":
        return <StoreMenu storeId={store} />;
      case "info":
        return <StoreFeed storeId={store} />;
      case "review":
        return <StoreReview storeId={store} />;
      default:
        return <StoreMenu storeId={store} />;
    }
  };

  return (
    <>
      <StoreInfo storeId={store} />{" "}
      {/* 스토어 이름을 StoreInfo 컴포넌트에 prop으로 전달합니다. */}
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
