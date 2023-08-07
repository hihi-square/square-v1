import React, { useState, useEffect } from "react";
import useGeoLocation from "react-hook-geolocation";
// import { Unstable_Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPage } from "redux/store";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const dispatch = useDispatch();
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  const locUpdate = (geolocation: any) => {};

  const geolocation = useGeoLocation(
    {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    },
    locUpdate
  );

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  const getCurrentPosBtn = () => {
    locUpdate(geolocation);
    getPosSuccess(geolocation);
  };

  // 3) 정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess = (pos: any) => {
    // 현재 위치(위도, 경도) 가져온다.
    // eslint-disable-next-line no-console
    console.log(pos);
    const currentPos = new window.kakao.maps.LatLng(
      pos.latitude, // 위도
      pos.longitude // 경도
    );
    // 지도를 이동 시킨다.

    map.panTo(currentPos);

    // 기존 마커를 제거하고 새로운 마커를 넣는다.
    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
  };

  useEffect(() => {
    dispatch(setPage("메인"));
  }, [dispatch]);

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
      <div onClick={getCurrentPosBtn}>현재 위치</div>
      <div>{map}</div>
      <div>{marker}</div>
    </div>
  );
}
