/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Unstable_Grid2 as Grid,
  Avatar,
  Button,
  Slider,
  Typography,
} from "@mui/material";
import { Map, MapMarker, Polygon, MarkerClusterer } from "react-kakao-maps-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  faHouse,
  faLocationCrosshairs,
  faGear,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { REST_API, setEmdCode, setCurrentName, RootState } from "redux/redux";
import axios from "axios";
import geojson from "geojson/Daejeon.json";
import "../Map.css";

declare global {
  interface Window {
    kakao: any;
  }
}

type UserInfo = {
  bcode: string;
  usrId: number;
  usrNick: string;
  depth: number;
  emdName: string;
  siggName: string;
  sidoName: string;
  fullName: string;
};

export default function MapLayer() {
  // 토큰과 맵, 유저 정보
  const token = sessionStorage.getItem("accessToken");
  const mapRef = useRef<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 맵의 높이와 맵의 중심좌표 위치
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [tmpInfo, setTmpInfo] = useState<UserInfo>();
  const [mapHeight, setMapHeight] = useState<number>(0);
  const [position, setPosition] = useState({
    center: { lat: 36.35052946607953, lng: 127.38496569971534 },
  });

  // 자신의 초기 동네와, 기타등등
  const emdCode = useSelector((state: RootState) => state.emd.emdCode);
  const [currDepth, setCurrDepth] = useState<number>(1);
  const [myLocation, setMyLocation] = useState({
    lat: 36.35052946607953,
    lng: 127.38496569971534,
  });
  const [seePolygon, setSeePolygon] = useState<boolean>(false);
  const [boundaryPolygon, setBoundaryPolygon] = useState<Set<string>>();
  const [storeMarker, setStoreMarker] = useState<any[]>([]);

  const depthSlider = [
    {
      value: 0,
      label: "우리동네",
    },
    {
      value: 50,
      label: "주변동네",
    },
    {
      value: 100,
      label: "먼동네",
    },
  ];
  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 전체 가게 정보를 받아옵니다.
  const getStoreData = () => {
    axios({
      url: `${REST_API}store/search/${emdCode}/${currDepth}`,
      method: "GET",
    })
      .then((response) => {
        makeStoreMarker(response.data.stores);
      })
      .catch((error) => {});
  };

  // 내 구역에 해당하는 폴리곤을 가져옵니다.
  const getPolygonData = () => {
    axios({
      url: `${REST_API}emd/${emdCode}/${currDepth}`,
      method: "GET",
    })
      .then((response) => {
        const newList: Set<string> = new Set(response.data);

        setBoundaryPolygon(newList);
      })
      .catch((error) => {});
  };

  // 내 기반 구역을 수정합니다.
  const updateBoundary = () => {
    axios({
      url: `${REST_API}user/address/${tmpInfo?.bcode}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const newData = { ...tmpInfo };

        sessionStorage.setItem("userInfo", JSON.stringify(newData));
        const tokenInfo = sessionStorage.getItem("userInfo");
        const parsedInfo: UserInfo = tokenInfo
          ? JSON.parse(tokenInfo)
          : undefined;

        setUserInfo(parsedInfo); // 유저 정보 설정
      })
      .catch((error) => {});

    handleBoundary();
  };

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 유저정보와 토큰으로 리디렉션을 진행합니다.
  // 이후 헤더와 푸터의 높이를 제거한 일정 높이를 맵의 높이로 설정합니다.
  // 또한 자신의 현재 위치로 바꿉니다.
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const height = window.innerHeight - 200;
      const tokenInfo = sessionStorage.getItem("userInfo");
      const parsedInfo: UserInfo = tokenInfo
        ? JSON.parse(tokenInfo)
        : undefined;

      setUserInfo(parsedInfo); // 유저 정보 설정
      setTmpInfo(parsedInfo); // 비교용 유저 정보 설정
      if (window.kakao.maps.services) getCurrentPos(); // 현재위치
      setMapHeight(height); // 맵 높이
    }
  }, []);

  // userInfo가 바뀌면, 현재 사용할 정보들 역시 변경합니다.
  useEffect(() => {
    changeBound();
  }, [userInfo]);

  // 현재의 코드정보가 바뀌거나 뎁스가 바뀌면, 다시 폴리곤과 가게 정보를 가져옵니다.
  useEffect(() => {
    if (emdCode && currDepth) {
      getStoreData();
      getPolygonData();
    }
  }, [currDepth, emdCode]);

  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 함수 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 내 활동반경으로 기준을 변경합니다.
  const changeBound = () => {
    dispatch(setEmdCode(userInfo?.bcode));
    dispatch(setCurrentName(userInfo?.fullName));
  };

  // 맵이 만들어질 때마다, 크기를 Resize합니다.
  const handleMapCreation = (map: Window["kakao"]["maps"]["Map"]) => {
    map.relayout();
  };

  // geojson에 있는 모든 폴리곤 데이터를 만들어 배열로 갖고 있습니다.
  const PolygonData = geojson.features.map((item) => ({
    name: item.properties.EMD_KOR_NM,
    code: `${item.properties.EMD_CD}00`,
    path: item.geometry.coordinates[0].map((pos) => ({
      lat: pos[1],
      lng: pos[0],
    })),
  }));

  // geolocation의 함수를 통해서 지도와 자신의 위치를 바꿉니다.
  // 현재의 코드와 풀 주소 역시 본인의 위치로 변경합니다.
  const getCurrentPos = () => {
    navigator.geolocation.getCurrentPosition((pos: any) => {
      setPosition({
        center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
      });

      setMyLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2RegionCode(
        pos.coords.longitude,
        pos.coords.latitude,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            dispatch(setEmdCode(result[0].code));
            dispatch(setCurrentName(result[0].address_name));
          }
        },
        null
      );
    });
  };

  // 지도가 움직이면 중심좌표를 바꾸어 지도가 움직일 수 있도록합니다.
  const handleMap = (map: any) => {
    setPosition({
      center: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
    });
  };

  // 가게 데이터를 모두 핀으로 만들기 위해, 핀 좌표를 설정합니다.
  // 또한 핀의 데이터를 바탕으로 지도의 레벨을 변화시킵니다.
  const makeStoreMarker = (datas: any[]) => {
    const tmpArray = [];
    const map = mapRef.current;
    const bound = new window.kakao.maps.LatLngBounds();

    for (const data of datas) {
      const coord = { lat: data.latitude, lng: data.longitude };

      tmpArray.push(coord);
    }

    tmpArray.forEach((point) => {
      bound.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
    });
    if (map) map.setBounds(bound);

    setStoreMarker(datas);
  };

  // 내 구역을 설정하기 위해 폴리곤이 나오는 화면으로 변경합니다.
  const handleBoundary = () => {
    setSeePolygon(!seePolygon);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  function valueLabelFormat(value: number) {
    return depthSlider.findIndex((depth) => depth.value === value) + 1;
  }

  // 슬라이더를 움직이면, 현재의 Depth를 바꿔줍니다.
  // Depth 역시 스토리지에 있으므로 넣어줍니다.
  const handleCurrDepth = (event: Event, cur: number | number[]) => {
    if (typeof cur === "number") {
      const tmpDepth = cur / 50 + 1;

      setCurrDepth(tmpDepth);

      const newData = { ...userInfo, depth: tmpDepth };

      sessionStorage.setItem("userInfo", JSON.stringify(newData));
    }
  };

  return (
    <Grid
      xs={12}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Map
        className="mapContainer"
        center={position.center}
        isPanto
        style={{
          width: "100%",
          height: `${mapHeight}px`,
        }}
        level={9}
        ref={mapRef}
        onCreate={handleMapCreation}
        onCenterChanged={(map) => handleMap(map)}
      >
        {PolygonData.map((polygon, index) =>
          seePolygon ? (
            <Polygon
              key={`c${index}`}
              path={polygon.path}
              strokeWeight={1} // 선의 두께입니다
              strokeColor={"black"} // 선의 색깔입니다
              strokeOpacity={tmpInfo?.bcode === `${polygon.code}` ? 0.8 : 0.2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
              fillColor={tmpInfo?.bcode === `${polygon.code}` ? "red" : "white"} // 채우기 색깔입니다
              fillOpacity={0.3} // 채우기 불투명도 입니다
              onClick={(_t, mouseEvent) => {
                // geocoder을 통해 클릭한 부분의 정보를 얻습니다.
                const geocoder = new window.kakao.maps.services.Geocoder();

                // 이후 이를 정보로 바꿔서, TmpInfo에 넣습니다.
                geocoder.coord2RegionCode(
                  mouseEvent.latLng.getLng(),
                  mouseEvent.latLng.getLat(),

                  (result: any, status: any) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                      const tmp = {
                        bcode: result[0].code,
                        depth: 1,
                        emdName: result[0].region_3depth_name,
                        siggName: result[0].region_2depth_name,
                        sidoName: result[0].region_1depth_name,
                        fullName: result[0].address_name,
                        usrId: userInfo?.usrId ? Number(userInfo.usrId) : 0,
                        usrNick: userInfo?.usrNick ? userInfo.usrNick : "",
                      };

                      setTmpInfo(tmp);
                    }
                  },
                  null
                );
              }}
            />
          ) : (
            <Polygon
              key={`c${index}`}
              path={polygon.path}
              strokeWeight={0.5} // 선의 두께입니다
              strokeColor={"grey"} // 선의 색깔입니다
              strokeOpacity={
                emdCode === `${polygon.code}`
                  ? 0.8
                  : boundaryPolygon?.has(polygon.code)
                  ? 0.8
                  : 0.2
              } // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
              fillColor={
                emdCode === `${polygon.code}`
                  ? "red"
                  : boundaryPolygon?.has(polygon.code)
                  ? "green"
                  : "white"
              } // 채우기 색깔입니다
              fillOpacity={0.1} // 채우기 불투명도 입니다
            />
          )
        )}
        <MapMarker
          position={myLocation}
          image={{
            src: "/img/icon/MyIcon.png",
            size: {
              width: 20,
              height: 30,
            },
            options: {
              offset: {
                x: 27,
                y: 69,
              },
            },
          }}
        />
        {!seePolygon && (
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={6} // 클러스터 할 최소 지도 레벨
          >
            {storeMarker.map((pos, index) => (
              <MapMarker
                key={index}
                position={{
                  lat: pos.latitude,
                  lng: pos.longitude,
                }}
                clickable={true}
                onClick={() => navigate(`/store/${pos.storeId}`)}
              >
                <Grid
                  sx={{
                    minWidth: "100px",
                    maxWidth: "200px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {pos?.logo ? (
                    <Avatar
                      alt="로고"
                      src={pos?.logo}
                      sx={{ width: 24, height: 24, marginRight: "10px" }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        marginRight: "10px",
                        bgcolor: "primary",
                      }}
                    >
                      S
                    </Avatar>
                  )}
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {pos?.storeName}
                  </Typography>
                </Grid>
              </MapMarker>
            ))}
          </MarkerClusterer>
        )}
      </Map>

      <Grid
        container
        sx={{
          position: "fixed",
          zIndex: 10,
          bottom: "80px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Slider
            aria-label="Restricted values"
            defaultValue={0}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            onChange={handleCurrDepth}
            step={null}
            marks={depthSlider}
            disabled={seePolygon}
            sx={{
              width: "90%",
              color: "#225a41",
              height: 8,
              "& .MuiSlider-track": {
                border: "1px solid",
              },
              "& .MuiSlider-thumb": {
                height: 24,
                width: 24,
                backgroundColor: "#fff",
                border: "2px solid currentColor",
                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "inherit",
                },
                "&:before": {
                  display: "none",
                },
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          position: "fixed",
          zIndex: 10,
          top: "60px",
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Grid xs={12} container>
          <Grid xs={4}>
            <Button
              onClick={changeBound}
              sx={{ fontSize: "18px", fontWeight: 700, width: "100%" }}
            >
              <FontAwesomeIcon
                icon={faHouse}
                style={{ margin: "0px 10px", color: "#225a41" }}
              />
              우리동네
            </Button>
          </Grid>
          <Grid xs={4}>
            <Button
              onClick={getCurrentPos}
              sx={{ fontSize: "18px", fontWeight: 700, width: "100%" }}
            >
              <FontAwesomeIcon
                icon={faLocationCrosshairs}
                style={{ margin: "0px 10px", color: "#225a41" }}
              />
              현재위치
            </Button>
          </Grid>
          <Grid xs={4}>
            {seePolygon ? (
              <Button
                sx={{ fontSize: "18px", fontWeight: 700, width: "100%" }}
                onClick={() => {
                  updateBoundary();
                }}
              >
                {" "}
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ margin: "0px 10px", color: "#225a41" }}
                />
                설정완료
              </Button>
            ) : (
              <Button
                onClick={handleBoundary}
                sx={{ fontSize: "18px", fontWeight: 700, width: "100%" }}
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{ margin: "0px 10px", color: "#225a41" }}
                />
                동네설정
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid sx={{ height: "80px" }}></Grid>
    </Grid>
  );
}
