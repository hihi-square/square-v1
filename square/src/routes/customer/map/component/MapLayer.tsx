/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import useGeoLocation from "react-hook-geolocation";
import geojson from "geojson/Daejeon.json";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { Map, MapMarker, Polygon } from "react-kakao-maps-sdk";

type CoordList = {
  name: string;
  code: string;
  path: {
    lat: number;
    lng: number;
  }[];
}[];

export default function MapLayer() {
  const [polygon, setPolygon] = useState<CoordList>();

  useEffect(() => {
    const PolygonData = geojson.features.map((item) => ({
      name: item.properties.EMD_KOR_NM,
      code: item.properties.EMD_CD,
      path: item.geometry.coordinates[0].map((pos) => ({
        lat: pos[1],
        lng: pos[0],
      })),
    }));

    setPolygon(PolygonData);
  }, []);

  return (
    <Grid container xs={12}>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "800px" }}
        level={3}
      >
        {polygon &&
          polygon.map((location, index) => (
            <Polygon
              path={location.path}
              strokeWeight={0.5}
              strokeColor={"black"}
              strokeOpacity={0.8}
              strokeStyle={"solid"}
              fillColor={"#A2FF99"}
              fillOpacity={0.3}
            />
          ))}
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </Grid>
  );
}
