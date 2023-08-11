/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Unstable_Grid2 as Grid, Fab, Slider } from "@mui/material";
import { Map, MapMarker, Polygon, MarkerClusterer } from "react-kakao-maps-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { REST_API } from "redux/redux";
import axios from "axios";
import geojson from "geojson/Daejeon.json";
import "../Map.css";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapLayer() {
  const mapRef = useRef<any>();
  const DJ = { lat: 36.35052946607953, lng: 127.38496569971534 };
  const [mapHeight, setMapHeight] = useState<number>(0);
  const [position, setPosition] = useState({
    center: { ...DJ },
  });
  const [view, setView] = useState({ lat: 0, lng: 0 });
  const [currDepth, setCurrDepth] = useState<number>(0);
  const [polygonList, setPolygonList] = useState<Set<string>>();
  const [emdCode, setEmdCode] = useState<string>("3011010200");
  const [renderCoord, setRenderCoord] = useState<
    { lat: number; lng: number }[]
  >([]);

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

  // const [selectDepth, setSelectDepth] = useState(false);

  const PolygonData = geojson.features.map((item) => ({
    name: item.properties.EMD_KOR_NM,
    code: `${item.properties.EMD_CD}00`,
    path: item.geometry.coordinates[0].map((pos) => ({
      lat: pos[1],
      lng: pos[0],
    })),
  }));

  useEffect(() => {
    const height = window.innerHeight - 200;

    setMapHeight(height);
  }, []);

  // 맨 처음, 그리고 depth가 바뀔때마다 새롭게 axios 통신을 통해 범위를 나타냅니다.
  useEffect(() => {
    if (emdCode && currDepth) {
      // eslint-disable-next-line no-console
      console.log("axios 통신입니다.");
      axios({
        url: `${REST_API}emd/${emdCode}/${currDepth}`,
        method: "GET",
      })
        .then((response) => {
          const newList: Set<string> = new Set(response.data);
          const myCoord = [];

          for (const polygon of PolygonData) {
            if (newList.has(polygon.code)) {
              for (const cur of polygon.path) {
                myCoord.push(cur);
              }
            }
          }

          const map = mapRef.current;

          const bound = new window.kakao.maps.LatLngBounds();

          myCoord.forEach((point) => {
            bound.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
          });
          if (map) map.setBounds(bound);
          setRenderCoord(myCoord);
          setPolygonList(newList);
        })
        .catch((error) => {});
    }
  }, [currDepth, emdCode]);

  const handleMapCreation = (map: Window["kakao"]["maps"]["Map"]) => {
    map.relayout();
  };

  const handleMap = (map: any) => {
    setPosition({
      center: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
    });

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.coord2RegionCode(
      map.getCenter().getLng(),
      map.getCenter().getLat(),
      callback,
      null
    );
  };

  const callback = function (result: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log(`지역 명칭 : ${result[0].address_name}`);
      console.log(`행정구역 코드 : ${result[0].code}`);
    }
  };

  const getCurrentPos = () => {
    navigator.geolocation.getCurrentPosition((pos: any) => {
      setPosition({
        center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
      });
    });
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  function valueLabelFormat(value: number) {
    return depthSlider.findIndex((depth) => depth.value === value) + 1;
  }

  // 슬라이더를 움직이면, 현재의 Depth를 바꿔줍니다.
  const handleCurrDepth = (event: Event, cur: number | number[]) => {
    if (typeof cur === "number") setCurrDepth(cur / 50 + 1);
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
          true ? (
            <Polygon
              path={polygon.path}
              strokeWeight={1} // 선의 두께입니다
              strokeColor={"black"} // 선의 색깔입니다
              strokeOpacity={
                emdCode === `${polygon.code}`
                  ? 0.8
                  : polygonList?.has(polygon.code)
                  ? 0.8
                  : 0.2
              } // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
              fillColor={
                emdCode === `${polygon.code}`
                  ? "red"
                  : polygonList?.has(polygon.code)
                  ? "green"
                  : "white"
              } // 채우기 색깔입니다
              fillOpacity={0.3} // 채우기 불투명도 입니다
              onClick={(_t, mouseEvent) => {
                setView({
                  lat: mouseEvent.latLng.getLat(),
                  lng: mouseEvent.latLng.getLng(),
                });
                setEmdCode(`${polygon.code}`);
              }}
            />
          ) : null
        )}
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={1} // 클러스터 할 최소 지도 레벨
        >
          {renderCoord.map((pos, index) => (
            <MapMarker
              key={index}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
            />
          ))}
        </MarkerClusterer>
      </Map>

      <Grid> lat:{view.lat} </Grid>
      <Grid> lng:{view.lng} </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 80, left: "80%", fontSize: "20px" }}
        onClick={getCurrentPos}
      >
        <FontAwesomeIcon
          icon={faLocationCrosshairs}
          style={{ color: "white" }}
        />
      </Fab>

      <Grid sx={{ position: "fixed", zIndex: 10, top: 85, width: "80%" }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={0}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          onChange={handleCurrDepth}
          step={null}
          marks={depthSlider}
        />
      </Grid>
    </Grid>
  );
}
