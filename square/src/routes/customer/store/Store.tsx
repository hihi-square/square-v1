/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Unstable_Grid2 as Grid,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { REST_API } from "redux/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { faPhone, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import Header from "./component/StoreHeader";
import StoreMenu from "./component/StoreMenu";
import StoreFeed from "./component/StoreFeed";
import StoreReview from "./component/StoreReview";
import Footer from "../Footer";

type Store = {
  account: string;
  address: string;
  bank: string;
  content: string;
  emdAddress: string;
  isOpened: false;
  storeName: string;
  storePhone: string;
  banner: string;
  logo: string;
  latitude: number;
  longitude: number;
};

export default function StorePage() {
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { store } = useParams<{ store?: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  const [info, setInfo] = useState<Store>();
  const [selectedTab, setSelectedTab] = useState("메뉴");
  const [isZzim, setZzim] = useState<boolean>(false);

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 가게의 정보를 가져옵니다.
  const getStoreId = () => {
    axios({
      url: `${REST_API}store/header/${store}`,
      method: "GET",
    })
      .then((response) => {
        console.log(response.data);
        setInfo(response.data);
      })
      .catch((error) => {
        navigate("/error", { state: error });
      });
  };

  // 찜 정보를 가져옵니다.
  const getDibs = () => {
    axios({
      url: `${REST_API}dibs/${store}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.data.message === "EXISTS") setZzim(true);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  };

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 로딩화면 및 출력 및 토큰 검사 후, axios 통신
  useEffect(() => {
    if (!token) navigate("/login");
    getStoreId();
    getDibs();
    setLoading(false);
  }, []);

  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 함수 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 헤더에 따라서 보여줄 요소를 결정합니다.
  const renderTabContent = () => {
    switch (selectedTab) {
      case "피드":
        return <StoreFeed storeId={store} />;
      case "리뷰":
        return <StoreReview />;
      default:
        return (
          <StoreMenu
            storeId={store || ""}
            storeName={info?.storeName || ""}
            storeThumbnail={info?.logo || ""}
          />
        );
    }
  };

  const handleZzim = () => {
    console.log("gd");
  };

  // 맵이 형성될 때 마다, 맵의 크기를 변경해 주어 오류가 나지 않도록 합니다.
  const handleMapCreation = (map: Window["kakao"]["maps"]["Map"]) => {
    map.relayout();
  };

  // 함수 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  if (loading) return <CircularProgress />;
  else {
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
        <Header setAni={null} />
        <Grid
          container
          xs={12}
          sx={{ position: "absolute", top: 0, justifyContent: "center" }}
        >
          <Grid xs={12}>
            {info?.banner ? (
              <img
                src={info?.banner}
                alt="가게배너"
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <img
                src="/img/store/store1.png"
                style={{ width: "100%", height: "auto" }}
                alt="가게배너"
              />
            )}
          </Grid>
          <Grid container xs={10}>
            <Grid
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
              mt="10px"
            >
              {info?.logo && (
                <Avatar
                  alt="로고"
                  src={info?.logo}
                  sx={{ marginRight: "10px" }}
                />
              )}
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  whiteSpace: "pre-line",
                }}
              >
                {info?.storeName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            xs={10}
            mt="5px"
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <IconButton
              sx={{ fontSize: "18px", color: isZzim ? "red" : "grey" }}
              onClick={handleZzim}
            >
              <FontAwesomeIcon icon={faHeart} />
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  fontWeight: 400,
                  textAlign: "center",
                  fontSize: "18px",
                  color: "grey",
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
              <FontAwesomeIcon icon={faShare} style={{ color: "gray" }} />
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
                공유
              </Typography>
            </IconButton>
          </Grid>
          <Grid xs={10}>
            <Box
              sx={{ width: "100%", height: "30vh", backgroundColor: "grey" }}
            >
              <Map
                center={{
                  lat: info?.latitude ? info?.latitude : 36.36633018880926,
                  lng: info?.longitude ? info?.longitude : 127.29839813101623,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                level={1}
                onCreate={handleMapCreation}
              >
                <MapMarker
                  position={{
                    lat: info?.latitude ? info?.latitude : 36.36633018880926,
                    lng: info?.longitude ? info?.longitude : 127.29839813101623,
                  }}
                />
              </Map>
            </Box>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                marginTop: "5px",
                fontWeight: 500,
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
            >
              {info && info.address}
            </Typography>
          </Grid>

          <Grid xs={12} mt="20px">
            <Divider variant="middle"></Divider>
          </Grid>
          <Grid
            xs={11}
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {["메뉴", "피드", "리뷰"].map((menu, index) => (
              <Button
                onClick={() => setSelectedTab(menu)}
                sx={{
                  flexGrow: 1,
                  backgroundColor:
                    selectedTab === menu ? "transparent" : "#f0f0f0",
                }}
                key={index}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: "18px",
                    color: selectedTab === menu ? "black" : "grey",
                    padding: "0px 5px",
                  }}
                >
                  {menu}
                </Typography>
              </Button>
            ))}
          </Grid>
          {renderTabContent()}
          <Grid xs={12} sx={{ height: "80px" }}></Grid>
        </Grid>

        <Grid container xs={12} justifyContent="center">
          <Footer now={6} />
        </Grid>
      </Grid>
    );
  }
}
