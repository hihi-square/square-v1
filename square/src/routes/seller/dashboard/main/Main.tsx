/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REST_API } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Box,
  Button,
  Divider,
  Paper,
  List,
  ListItem,
  IconButton,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "../../Seller.css";

type StoreInfo = {
  account: number | null;
  address: string;
  backgroundImgUrl: string[];
  bank: string;
  content: string;
  emdAdress: string;
  storeName: string;
  storePhone: string;
};

export default function Main() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo).userId : 0;

  const [reload, setReload] = useState<boolean>(true); // 아이템 업로드
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();

  useEffect(() => {
    if (reload) {
      axios({
        url: `${REST_API}store/header/${user}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setStoreInfo({ ...res.data });
        })
        .catch(() => {
          navigate("/error");
        });

      setReload(false);
    }
  }, [reload]);
  return (
    <>
      <Grid xs={5} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ width: "95%", margin: "10px 0px" }}>
          <Grid
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              height: "300px",
            }}
          >
            {storeInfo && storeInfo.backgroundImgUrl.length !== 0 ? null : (
              <img
                src="/img/sample/defaultImage.png"
                style={{ width: "95%", height: "250px" }}
                alt="기본이미지"
              />
            )}
            <Typography
              variant="body2"
              component="div"
              sx={{
                position: "absolute", // 절대 위치 설정
                top: "10px", // 상단에서 10px
                right: "10px", // 우측에서 10px
                fontWeight: 500,
                backgroundColor: "rgba(255,255,255,0.5)", // 배경을 약간 투명하게
                padding: "0 5px",
              }}
            >
              사진 수정
            </Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: "18%",
                left: "50%",
                transform: "translate(-50%, 50%)", // 이동하여 중앙에 위치하게 조정
                width: "100px",
                height: "100px",
                borderRadius: "50%", // 동그라미 모양으로
                backgroundColor: "rgba(0,0,0,1)", // 색상 및 투명도 설정
              }}
            ></Box>
          </Grid>
          <Grid
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                }
              >
                {storeInfo && storeInfo.storeName}
              </ListItem>
              <Divider></Divider>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                }
              >
                {storeInfo && storeInfo.storePhone}
              </ListItem>
              <Divider></Divider>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                }
              >
                {storeInfo && storeInfo.content}
              </ListItem>
              <Divider></Divider>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                }
              >
                {storeInfo && storeInfo.address}
              </ListItem>
              <Divider></Divider>
            </List>
            <Box
              sx={{ width: "90%", height: "200px", backgroundColor: "grey" }}
            >
              지도가 들어갈 공간
            </Box>
          </Grid>
        </Paper>
      </Grid>
      <Grid className="half-size" xs={7} sx={{ paddingBottom: "10px" }}>
        <Paper elevation={3} sx={{ width: "95%", margin: "10px 0px" }}>
          <Typography
            variant="body2"
            component="div"
            sx={{
              fontWeight: 500,
            }}
          >
            사진 수정
          </Typography>
          <Button>가게 열기</Button>
        </Paper>
        <Paper elevation={3} sx={{ width: "95%", margin: "10px 0px" }}>
          dd
        </Paper>
      </Grid>
    </>
  );
}
