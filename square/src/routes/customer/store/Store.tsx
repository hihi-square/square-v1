import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom"; // useParams를 import합니다.
import { REST_API } from "redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faHeart,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./component/StoreHeader";
// import Footer from "../Footer";
import StoreMenu from "./component/StoreMenu";
import StoreFeed from "./component/StoreFeed";
import StoreReview from "./component/StoreReview";
import SelectMenu from "./component/SelectMenu";
import Footer from "../Footer";

function StorePage() {
  type Store = {
    name: string;
    image: string[];
    address: string;
    phone: string;
    content: string;
  };

  type Item = {
    menuId: number;
    menuName: string;
    menuThumbnail: string;
    menuImage: string;
    description: string;
    status: number;
    popularity: boolean;
    signature: boolean;
    price: number;
  };

  const { store } = useParams<{ store?: string }>();
  const [state, setState] = useState<boolean>(false);
  const [curItem, setCurItem] = useState<Item>();

  const [info, setInfo] = useState<Store>({
    name: "펭소네 구멍가게",
    image: ["/img/store/store1.png"],
    address: "대전광역시 유성구 봉명동 펭소 1길",
    phone: "010-0000-0000",
    content: "안녕하세요 펭소입니다 저희 가게에 오신걸 환영합니다!",
  });
  const [selectedTab, setSelectedTab] = useState("menu");

  useEffect(() => {
    // storeId를 사용해 메뉴 정보를 가져오는 API를 호출합니다.

    axios({
      url: `${REST_API}store/${store}`,
      method: "GET",
      params: {},
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log("받아온 데이터:", response.data);
        setInfo(response.data);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  }, [store]); // storeId가 변경될 때마다 API 호출을 다시 합니다.

  const renderTabContent = () => {
    switch (selectedTab) {
      case "feed":
        return <StoreFeed storeId={store} />;
      case "review":
        return <StoreReview storeId={store} />;
      default:
        return (
          <StoreMenu
            setState={setState}
            setCurItem={setCurItem}
            storeId={store}
          />
        );
    }
  };

  return (
    <Grid
      container
      xs={12}
      direction="column"
      sx={{
        position: "relative",
        backgroundColor: "white",
        zIndex: "2",
      }}
    >
      <Header setAni={null} name={info.name} />
      <Grid
        container
        xs={12}
        sx={{ position: "absolute", top: 0, justifyContent: "center" }}
      >
        <Grid xs={12}>
          <img
            src={info.image[0]}
            alt="가게배너"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid container xs={10}>
          <Grid xs={12} mt="10px">
            <Typography
              variant="h4"
              component="h4"
              sx={{
                fontWeight: 700,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {info.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 500,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {info.address}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          xs={10}
          mt="5px"
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <IconButton sx={{ fontSize: "18px", color: "#000000" }}>
            <FontAwesomeIcon icon={faHeart} style={{ color: "gray" }} />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 400,
                textAlign: "center",
                fontSize: "18px",
                color: "gray",
                padding: "0px 10px",
              }}
            >
              단골
            </Typography>
          </IconButton>

          <Divider orientation="vertical" variant="middle" flexItem />

          <IconButton sx={{ fontSize: "18px", color: "#000000" }}>
            <FontAwesomeIcon icon={faPhone} style={{ color: "gray" }} />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 400,
                textAlign: "center",
                fontSize: "18px",
                color: "gray",
                padding: "0px 10px",
              }}
            >
              전화
            </Typography>
          </IconButton>

          <Divider orientation="vertical" variant="middle" flexItem />
          <IconButton sx={{ fontSize: "18px", color: "#000000" }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ color: "gray" }} />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 400,
                textAlign: "center",
                fontSize: "18px",
                color: "gray",
                padding: "0px 10px",
              }}
            >
              지도
            </Typography>
          </IconButton>
        </Grid>
        <Grid
          xs={12}
          mt="10px"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Paper
            elevation={1}
            sx={{ width: "80%", minHeight: "200px" }}
          ></Paper>
        </Grid>
        <Grid xs={12} mt="20px">
          <Divider variant="middle"></Divider>
        </Grid>
        <Grid
          xs={12}
          sx={{
            padding: "15px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
         <Button 
  onClick={() => setSelectedTab("menu")}
  sx={{
      boxShadow: selectedTab === "menu" ? '3px 3px 5px rgba(0,0,0,0.3)' : 'none',
      backgroundColor: selectedTab === "menu" ? '#f0f0f0' : 'transparent',
      "&:hover": {
          backgroundColor: selectedTab === "menu" ? '#e0e0e0' : 'transparent',
      }
  }}
>
  <Typography
    variant="h6"
    component="h6"
    sx={{
      fontWeight: 500,
      textAlign: "center",
      fontSize: "20px",
      color: "black",
      padding: "0px 5px",
    }}
  >
    메뉴
  </Typography>
</Button>

<Button 
  onClick={() => setSelectedTab("feed")}
  sx={{
      boxShadow: selectedTab === "feed" ? '3px 3px 5px rgba(0,0,0,0.3)' : 'none',
      backgroundColor: selectedTab === "feed" ? '#f0f0f0' : 'transparent',
      "&:hover": {
          backgroundColor: selectedTab === "feed" ? '#e0e0e0' : 'transparent',
      }
  }}
>
  <Typography
    variant="h6"
    component="h6"
    sx={{
      fontWeight: 500,
      textAlign: "center",
      fontSize: "20px",
      color: "black",
      padding: "0px 5px",
    }}
  >
    피드
  </Typography>
</Button>

<Button 
  onClick={() => setSelectedTab("review")}
  sx={{
      boxShadow: selectedTab === "review" ? '3px 3px 5px rgba(0,0,0,0.3)' : 'none',
      backgroundColor: selectedTab === "review" ? '#f0f0f0' : 'transparent',
      "&:hover": {
          backgroundColor: selectedTab === "review" ? '#e0e0e0' : 'transparent',
      }
  }}
>
  <Typography
    variant="h6"
    component="h6"
    sx={{
      fontWeight: 500,
      textAlign: "center",
      fontSize: "20px",
      color: "black",
      padding: "0px 5px",
    }}
  >
    리뷰
  </Typography>
</Button>
        </Grid>
        {renderTabContent()}
      </Grid>
      <Grid container xs={12} justifyContent="center">
        {/* <Footer /> */}
        <SelectMenu state={state} setState={setState} curItem={curItem} />
      </Grid>
      <Footer/>
    </Grid>
   
  );
}

export default StorePage;
