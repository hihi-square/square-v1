/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REST_API } from "redux/redux";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import {
  Unstable_Grid2 as Grid,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  Paper,
  InputBase,
  IconButton,
  Typography,
} from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Banner from "./component/Banner";
import Logo from "./component/Logo";
import "../Seller.css";

type StoreInfo = {
  account: number;
  address: string;
  banner: string;
  bank: string;
  content: string;
  emdAddress: {
    bcode: number;
    aemId: number;
    fullName: string;
    siggAdress: {
      asiId: number;
      amdCode: string;
      name: string;
      sidoName: string;
      sidoAddress: {
        amdCode: number;
        asdId: number;
        name: string;
      };
    };
    siggName: string;
  };
  hashtags: string;
  isOpened: boolean;
  latitude: number;
  longitude: number;
  logo: string;
  openTime: string;
  storeName: string;
  storePhone: string;
};

export default function Main() {
  const array: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];
  const textArray: string[] = [
    "도넛",
    "주스",
    "샐러드",
    "커피",
    "빵",
    "케이크",
    "탕후루",
    "간편음식",
    "분식",
    "샌드위치",
    "김밥",
    "회/초밥",
  ];
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo).userId : 0;

  const [reload, setReload] = useState<boolean>(true); // 아이템 업로드
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();
  const [tags, setTags] = useState<string[]>([]);
  const [myTag, setMyTag] = useState<string>("");
  const [isBanner, setBanner] = useState<boolean>(false);
  const [isLogo, setLogo] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  // const [control, setControl] = useState<boolean[]>([false, false, false]);

  // const handleForm = (index: number) => {
  //   const newControl = [...control];

  //   newControl[index] = true;
  //   setControl(newControl);
  // };

  const handleImage = (imageURL: string, type: number) => {
    if (storeInfo && type === 1) {
      setStoreInfo({ ...storeInfo, banner: imageURL });
      setChanged(true);
    } else if (storeInfo && type === 2) {
      setStoreInfo({ ...storeInfo, logo: imageURL });
      setChanged(true);
    }
    console.log(changed);
  };

  const handleTag: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const curr = event.target.value;

    setMyTag(curr);
  };

  const handleDelete = (index: number) => {
    const tmpList = [...tags];

    tmpList.splice(index, 1);
    setTags(tmpList);
  };

  useEffect(() => {
    if (reload) {
      axios({
        url: `${REST_API}store`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          setStoreInfo({ ...res.data.storeInfo });
        })
        .catch(() => {
          navigate("/error");
        });

      setReload(false);
    }
  }, [reload]);

  const changeData = () => {
    if (changed) {
      axios({
        url: `${REST_API}store`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          storeName: storeInfo?.storeName,
          storePhone: storeInfo?.storePhone,
          bcode: storeInfo?.emdAddress.bcode,
          address: storeInfo?.address,
          content: storeInfo?.content,
          bank: storeInfo?.bank,
          account: storeInfo?.account,
          hashtags: storeInfo?.hashtags,
          banner: storeInfo?.banner,
          logo: storeInfo?.logo,
          latitude: storeInfo?.latitude,
          longitude: storeInfo?.longitude,
        },
      })
        .then((res) => {
          console.log(res);
          setReload(true);
          setChanged(false);
        })
        .catch(() => {
          navigate("/error");
        });

      setReload(true);
    }
  };

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
      <Grid xs={12} container sx={{ justifyContent: "center" }}>
        <Grid xs={12}>
          <Grid
            xs={12}
            sx={{ marginTop: 3, marginLeft: 5, paddingBottom: "10px" }}
          >
            <Typography
              variant="h3"
              sx={{ marginBottom: 1, color: "#225a41", fontWeight: 700 }}
            >
              {" "}
              가게관리{" "}
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
              현재 가게의 상태를 관리합니다.
            </Typography>
          </Grid>
        </Grid>
        <Grid xs="auto" sx={{ width: "400px" }}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "95%",
              height: "800px",
              margin: "10px 0px",
            }}
          >
            <Grid
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                height: "360px",
              }}
            >
              {storeInfo && storeInfo.banner ? (
                <img
                  src={storeInfo.banner}
                  style={{ width: "95%", height: "300px" }}
                  alt="기본이미지"
                />
              ) : (
                <img
                  src="/img/sample/defaultImage.png"
                  style={{ width: "95%", height: "400px" }}
                  alt="기본이미지"
                />
              )}
              <Typography
                variant="body2"
                component="div"
                onClick={() => {
                  setBanner(true);
                }}
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
                  bottom: "0%",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={storeInfo && storeInfo.logo}
                    sx={{ width: 120, height: 120 }}
                  />

                  {/* 수정 아이콘 */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "white",
                      borderRadius: 5,
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setLogo(true);
                      }}
                    >
                      <AiOutlineEdit size="20" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  marginTop: "10px",
                  fontWeight: 700,
                }}
              >
                {storeInfo && storeInfo.storeName}
              </Typography>
              <Grid sx={{ width: "75%" }}>
                <Divider variant="middle"></Divider>
              </Grid>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  color: "secondary.main",
                  marginTop: "10px",
                  fontWeight: 500,
                }}
              >
                가게 번호
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  marginTop: "2px",
                  fontWeight: 500,
                }}
              >
                {storeInfo && storeInfo.storePhone}
              </Typography>
              <Grid sx={{ width: "75%" }}>
                <Divider variant="middle"></Divider>
              </Grid>

              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  color: "secondary.main",
                  marginTop: "10px",
                  fontWeight: 500,
                }}
              >
                가게 주소
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  marginTop: "2px",
                  marginBottom: "15px",
                  fontWeight: 500,
                }}
              >
                {storeInfo && storeInfo.address}
              </Typography>
            </Grid>
            <Map // 지도를 표시할 Container
              center={{
                // 지도의 중심좌표
                lat: storeInfo?.latitude ? storeInfo?.latitude : 33.450701,
                lng: storeInfo?.longitude ? storeInfo?.longitude : 126.570667,
              }}
              style={{
                // 지도의 크기
                width: "350px",
                height: "250px",
                marginBottom: "20px",
              }}
              level={1} // 지도의 확대 레벨
            >
              <MapMarker // 마커를 생성합니다
                position={{
                  // 마커가 표시될 위치입니다
                  lat: storeInfo?.latitude ? storeInfo?.latitude : 33.450701,
                  lng: storeInfo?.longitude ? storeInfo?.longitude : 126.570667,
                }}
              />
            </Map>
          </Paper>
        </Grid>
        <Grid xs>
          <Paper elevation={3} sx={{ width: "95%", margin: "10px 0px" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Grid>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    padding: "20px 0px 5px 20px",
                    fontWeight: 600,
                  }}
                >
                  현재 가게는
                  {storeInfo?.isOpened
                    ? " 영업 중입니다."
                    : " 영업이 종료되었습니다."}
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    fontWeight: 500,
                    paddingLeft: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  {storeInfo?.isOpened
                    ? "오늘의 판매를 종료하려면 가게를 닫아주세요."
                    : "오늘의 판매를 시작하려면 가게를 열어주세요."}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color={storeInfo?.isOpened ? "secondary" : "secondary"}
                  sx={{ height: "70%" }}
                >
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {storeInfo?.isOpened ? "가게 닫기" : "가게 열기"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} sx={{ width: "95%", margin: "10px 0px" }}>
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: 500,
              }}
            >
              검색 키워드
            </Typography>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                justifyContent: "space-around",
                width: "90%",
                height: "50px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                fullWidth
                value={myTag}
                onChange={handleTag}
                placeholder="원하는 검색 키워드를 입력하세요"
                inputProps={{ "aria-label": "해시태그로 검색" }}
              />
              <IconButton
                onClick={() => {
                  setTags([...tags, myTag]);
                  setMyTag("");
                }}
                sx={{ fontSize: "20px" }}
              >
                <FontAwesomeIcon icon={faPen} style={{ color: "gray" }} />
              </IconButton>
            </Paper>
            <Typography
              variant="body2"
              component="div"
              sx={{
                fontWeight: 400,
                color: "secondary.main",
                paddingTop: "5px",
                width: "90%",
                textAlign: "left",
              }}
            >
              현재 검색어
            </Typography>
            <Box
              sx={{
                display: "flex",
                paddingTop: "5px",
                maxWidth: "90%",
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
              }}
            >
              {tags.map((chip, idx) => (
                <>
                  <Chip
                    label={chip}
                    size="small"
                    variant="outlined"
                    onDelete={() => {
                      handleDelete(idx);
                    }}
                    sx={{
                      padding: "0px 0px",
                    }}
                  />
                  <Box sx={{ padding: "0px 5px" }}></Box>
                </>
              ))}
            </Box>
            {array.map((row, idx) => (
              <Grid container xs={12} justifyContent="center" key={`a${idx}`}>
                {row.map((col, innerIdx) => (
                  <Grid
                    xs={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={innerIdx}
                  >
                    <img
                      src={`/img/icon/icon${col}.png`}
                      style={{ width: "60%" }}
                      alt="hashtag"
                    />
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        color: "secondary.main",
                        padding: "0px",
                        width: "90%",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {textArray[col - 1]}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
            <Button onClick={changeData}> 정보 수정 완료</Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={isBanner}>
        <Box sx={{ width: 600, height: 800 }}>
          <Button
            onClick={() => {
              setBanner(false);
            }}
          >
            X
          </Button>
          <Banner setBanner={setBanner} handleBanner={handleImage} />
        </Box>
      </Dialog>
      <Dialog open={isLogo}>
        <Box sx={{ width: 600, height: 800 }}>
          <Button
            onClick={() => {
              setLogo(false);
            }}
          >
            X
          </Button>
          <Logo setLogo={setLogo} handleLogo={handleImage} />
        </Box>
      </Dialog>
    </>
  );
}
