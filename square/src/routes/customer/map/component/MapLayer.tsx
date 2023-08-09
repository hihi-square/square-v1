/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Unstable_Grid2 as Grid, Fab } from "@mui/material";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapLayer() {
  const [mapHeight, setMapHeight] = useState<number>(0);
  const [position, setPosition] = useState({
    center: { lat: 36.23724059472532, lng: 128.43317071389092 },
    isPanto: true,
  });

  useEffect(() => {
    const height = window.innerHeight - 140;

    setMapHeight(height);
  }, []);

  const handleMapCreation = (map: Window["kakao"]["maps"]["Map"]) => {
    map.relayout();
  };

  const getPosSuccess = (pos: any) => {
    // 현재 위치(위도, 경도) 가져온다.
    // eslint-disable-next-line no-console
    console.log(pos.coords.latitude);

    setPosition({
      center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
      isPanto: true,
    });
  };

  const getCurrentPos = () => {
    navigator.geolocation.getCurrentPosition(getPosSuccess);
  };

  return (
    <Grid container xs={12}>
      <Map
        center={position.center}
        isPanto={position.isPanto}
        style={{ width: "100%", height: `${mapHeight}px` }}
        level={3}
        onCreate={handleMapCreation}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ bottom: 80, left: "80%", fontSize: "20px" }}
        onClick={getCurrentPos}
      >
        <FontAwesomeIcon
          icon={faLocationCrosshairs}
          style={{ color: "white" }}
        />
      </Fab>
    </Grid>
  );
}
