import React, { useState, useEffect } from "react";
import axios from "axios";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useParams } from "react-router-dom"; // useParams를 import합니다.
import { REST_API } from "redux/store";
import Header from "./component/StoreHeader123";
import StoreMenu from "./component/storeMenu";
import StoreFeed from "./component/storeFeed";
import StoreReview from "./component/storeReview";

function StorePage() {
  type Store = {
    name: string;
    address: string;
    phone: string;
    content: string;
  };

  const { store } = useParams<{ store?: string }>();
  const [info, setInfo] = useState<Store>({
    name: "펭소네 구멍가게",
    address: "대전광역시 유성구 봉명동 펭소 1길",
    phone: "010-0000-0000",
    content: "안녕하세요 펭소입니다 저희 가게에 오신걸 환영합니다!",
  });
  const [selectedTab, setSelectedTab] = useState("menu");
  const [animation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    // storeId를 사용해 메뉴 정보를 가져오는 API를 호출합니다.

    axios({
      url: `${REST_API}store/${store}`,
      method: "GET",
      params: {},
    })
      .then((response) => {
        console.log("받아온 데이터:", response.data);
        setInfo(response.data);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  }, []); // storeId가 변경될 때마다 API 호출을 다시 합니다.

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
    <Grid
      container
      xs={12}
      direction="column"
      className={`animate__animated 
      ${animation ? "animate__slideOutRight" : "animate__slideInRight"}`}
      sx={{
        backgroundColor: "white",
        zIndex: "2",
        "--animate-duration": "200ms",
      }}
    >
      <Header setAni={setAnimation} name={info.name} />
      <Grid xs={12}></Grid>
      <Grid xs={12}>
        <div className="button-container">
          <button onClick={() => setSelectedTab("menu")}>메뉴</button>
          <button onClick={() => setSelectedTab("info")}>정보</button>
          <button onClick={() => setSelectedTab("review")}>리뷰</button>
          {selectedTab}
        </div>
      </Grid>
      <div>{renderTabContent()}</div>
    </Grid>
  );
}

export default StorePage;
