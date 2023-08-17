/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import {
  Unstable_Grid2 as Grid,
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { REST_API } from "redux/redux";
import FeedImage from "./component/FeedImage";

type Notice = {
  snoId: number;
  storeId: number;
  state: string;
  storeName: string;
  storeLogo: string;
  createdAt: number[];
  modifiedAt: number[];
  content: string;
  images: {
    connectedId: number;
    imgId: number;
    order: number;
    thumbnail: string;
    type: string;
    url: string;
  }[];
};

// Feed를 묶는 함수
const feedPackaging = (array: any[], size: number): any[] => {
  const pack = [];

  for (let i = 0; i < array.length; i += size) {
    pack.push(array.slice(i, i + size));
  }

  return pack;
};

export default function Feed() {
  const token = localStorage.getItem("accessToken");
  const [feedList, setFeedList] = useState<Notice[]>();
  const [isOpen, setOpen] = useState<boolean>(false);
  const imgController = feedList ? new Array(feedList.length).fill(0) : [];
  const packedFeed = useMemo(
    () => (feedList ? feedPackaging(feedList, 3) : []),
    [feedList]
  );

  // 피드를 가져오는 axios 함수
  const getFeed = () => {
    axios({
      url: `${REST_API}store/daily/list`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const list: Notice[] = [];

        list.push(...response.data.notices);
        setFeedList(list);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  };

  // 날짜를 생성하는 함수
  const convertToDateArray = (dateArray: number[]) =>
    new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      dateArray[3],
      dateArray[4],
      dateArray[5]
    );

  // useEffect ------------------------------------------------------------------------

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <Grid
      xs={12}
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          height: "12vh",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            textAlign: "left",
            padding: "10px 0px 2px 10px",
            fontWeight: 800,
          }}
        >
          피드 관리
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            textAlign: "left",
            padding: "0px 0px 0px 10px",
            fontWeight: 400,
          }}
        >
          가게에서 고객들에게 보여줄 피드를 관리할 수 있습니다.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          top: "5vh",
          right: "20px",
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        피드 추가
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          position: "absolute",
          top: "5vh",
          right: "120px",
        }}
      >
        피드 삭제
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "70vh",
          overflowX: "hidden",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Grid container sx={{ width: "100%" }}>
          {packedFeed && packedFeed.length > 0 ? (
            packedFeed.map((feed, index) => (
              <Grid xs={12} container key={index}>
                {feed.map((item: Notice, subIndex: number) => (
                  <Grid
                    key={subIndex}
                    xs={4}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Paper
                      sx={{
                        width: "95%",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "15px",
                      }}
                    >
                      <img
                        src={
                          item.images[imgController[3 * index + subIndex]]
                            .thumbnail
                        }
                        alt="피드 그림"
                        style={{ width: "100%", height: "auto" }}
                      />

                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          width: "100%",
                          height: "120px",
                          fontWeight: 500,
                          overflow: "hidden",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {item.content}
                      </Typography>

                      <Divider sx={{ margin: "10px 5px" }}></Divider>
                      <Box
                        sx={{
                          width: "100%",
                          height: "80px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            alt="아바타"
                            src={item.storeLogo}
                            sx={{
                              border: "1px solid lightgrey",
                              width: 30,
                              height: 30,
                              marginLeft: "10px",
                            }}
                          />
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              margin: "0px 15px",
                              fontWeight: 600,
                              textAlign: "end",
                            }}
                          >
                            {item.storeName}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            width: "95%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            margin: "10px 0px",
                            fontWeight: 400,
                            fontSize: "12px",
                            textAlign: "end",
                          }}
                        >
                          {convertToDateArray(item.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ))
          ) : (
            <>피드가 없습니다.</>
          )}
        </Grid>
      </Box>
      <Dialog open={isOpen}>
        <Box sx={{ width: 600, height: 800, overflowY: "scroll" }}>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </Button>
          <FeedImage setOpen={setOpen} />
        </Box>
      </Dialog>
    </Grid>
  );
}
