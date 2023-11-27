/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import {
  Unstable_Grid2 as Grid,
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { REST_API } from "redux/redux";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
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

type POST = {
  content: string;
  state: string;
  images: // url과 thumbnail은 S3 이미지 컨트롤러를 이용해서 생성
  {
    url: string;
    order: number;
    thumbnail: string;
  }[];
};

const initialState: POST = {
  content: "",
  state: "PUBLIC",
  images: [],
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
  const [render, reRender] = useState<boolean>(false);
  const [feedList, setFeedList] = useState<Notice[]>();
  const [currentNotice, setCurrentNotice] = useState<POST>({ ...initialState });
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [currentSnoId, setCurrentSnoId] = useState<number>(0);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [imgController, setImgController] = useState<number[]>([]);
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

        console.log(list);

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

  const handleCurrentSnoId = (id: number) => {
    if (currentSnoId === id) setCurrentSnoId(0);
    else setCurrentSnoId(id);
  };

  const handleCurrentFeed = (idx: number) => {
    if (currentIndex === idx) {
      setCurrentIndex(-1);
      setCurrentNotice({ ...initialState });
    } else {
      setCurrentIndex(idx);
      const tmpArray = [];

      if (feedList && feedList[idx]) {
        for (let i = 0; i < feedList[idx].images.length; i++) {
          const obj = {
            url: feedList[idx].images[i].url,
            order: feedList[idx].images[i].order,
            thumbnail: feedList[idx].images[i].thumbnail,
          };

          tmpArray.push(obj);
        }
        setCurrentNotice({
          content: feedList[idx].content,
          state: feedList[idx].state,
          images: tmpArray,
        });
      }
    }
  };

  const deleteFeed = () => {
    axios({
      url: `${REST_API}store/daily/${currentSnoId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        reRender(true);
      })
      .catch((error) => {
        console.log("/error");
      });
  };

  // useEffect ------------------------------------------------------------------------

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    setImgController(feedList ? new Array(feedList.length).fill(0) : []);
  }, [feedList]);

  useEffect(() => {
    if (render) {
      getFeed();
      reRender(false);
    }
  }, [render]);

  return (
    <>
      <Grid xs={12} container sx={{ justifyContent: "center" }}>
        <Grid
          xs={12}
          sx={{ marginTop: 3, marginLeft: 5, position: "relative" }}
        >
          <Grid xs={12} sx={{ paddingBottom: "10px" }}>
            <Typography
              variant="h3"
              sx={{ marginBottom: 1, color: "#225a41", fontWeight: 700 }}
            >
              {" "}
              피드관리{" "}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "primary.main",
                flexGrow: 1,

                textAlign: "left",
                fontWeight: 400,
              }}
            >
              가게의 배너/로고를 수정하고, 가게 영업 여부를 결정하거나 검색
              키워드를 설정합니다.
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color={currentIndex === -1 ? "primary" : "secondary"}
            sx={{
              position: "absolute",
              top: "5vh",
              right: "20px",
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            {currentIndex === -1 ? "피드 추가" : "피드 수정"}
          </Button>
          {currentIndex !== -1 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                deleteFeed();
              }}
              sx={{
                position: "absolute",
                top: "5vh",
                right: "120px",
              }}
            >
              피드 삭제
            </Button>
          )}
        </Grid>

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
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        handleCurrentFeed(index * 3 + subIndex);
                        handleCurrentSnoId(item.snoId);
                      }}
                    >
                      <Paper
                        sx={{
                          width: "95%",
                          display: "flex",
                          flexDirection: "column",
                          marginBottom: "15px",

                          border:
                            currentIndex === index * 3 + subIndex
                              ? "2px solid"
                              : "none",
                        }}
                      >
                        <img
                          src={
                            item.images[imgController[3 * index + subIndex]]
                              ? item.images[imgController[3 * index + subIndex]]
                                  .thumbnail
                              : item.images[0].thumbnail
                          }
                          alt="피드 그림"
                          style={{ width: "100%", height: "auto" }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            margin: "0px 3px",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={(event) => {
                              event.stopPropagation();
                              const newArr = [...imgController];

                              newArr[3 * index + subIndex] =
                                (newArr[3 * index + subIndex] +
                                  item.images.length -
                                  1) %
                                item.images.length;
                              setImgController(newArr);
                            }}
                          >
                            <MdArrowBack style={{ marginLeft: "10px" }} />
                          </IconButton>

                          <Typography
                            variant="body2"
                            component="div"
                            sx={{
                              width: "100%",
                              fontWeight: 400,
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            {`${imgController[3 * index + subIndex] + 1} / ${
                              item.images.length
                            }`}
                          </Typography>
                          <IconButton
                            onClick={(event) => {
                              event.stopPropagation();

                              const newArr = [...imgController];

                              newArr[3 * index + subIndex] =
                                (newArr[3 * index + subIndex] +
                                  item.images.length +
                                  1) %
                                item.images.length;
                              setImgController(newArr);
                            }}
                          >
                            <MdArrowForward style={{ marginRight: "10px" }} />
                          </IconButton>
                        </Box>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{
                            width: "100%",
                            height: "150px",
                            fontWeight: 500,
                            overflowY: "auto",
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
                            {convertToDateArray(
                              item.createdAt
                            ).toLocaleString()}
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
            <FeedImage
              reRender={reRender}
              setOpen={setOpen}
              currentNotice={currentNotice}
              setCurrentNotice={setCurrentNotice}
              currentSnoId={currentSnoId}
            />
          </Box>
        </Dialog>
      </Grid>
    </>
  );
}
