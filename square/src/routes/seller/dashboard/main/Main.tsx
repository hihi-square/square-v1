/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REST_API } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  Paper,
  List,
  ListItem,
  InputBase,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Banner from "./component/Banner";
import Logo from "./component/Logo";
import "../../Seller.css";

type StoreInfo = {
  account: number;
  address: string;
  banner: string;
  bank: string;
  content: string;
  emdAddress: {
    admCode: number;
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

  const [isOpened, setOpened] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(true); // 아이템 업로드
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();
  const [tags, setTags] = useState<string[]>([]);
  const [myTag, setMyTag] = useState<string>("");
  const [isBanner, setBanner] = useState<boolean>(false);
  const [isLogo, setLogo] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [control, setControl] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const handleForm = (index: number) => {
    const newControl = [...control];

    newControl[index] = true;
    setControl(newControl);
  };

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

  const handleName = (name: string) => {
    if (storeInfo) {
      setStoreInfo({ ...storeInfo, storeName: name });
      setChanged(true);
    }
    console.log(changed);
  };

  const handlePhone = (storePhone: string) => {
    if (storeInfo) {
      setStoreInfo({ ...storeInfo, storePhone });
      setChanged(true);
    }
    console.log(changed);
  };

  const handleAddress = (address: string) => {
    if (storeInfo) {
      setStoreInfo({ ...storeInfo, address });
      setChanged(true);
    }
    console.log(changed);
  };

  const handleContent = (content: string) => {
    if (storeInfo) {
      setStoreInfo({ ...storeInfo, content });
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
          bcode: storeInfo?.emdAddress.admCode,
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
      <Grid xs={5} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ width: "95%", margin: "10px 0px" }}>
          <Grid
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              height: "500px",
            }}
          >
            {storeInfo && storeInfo.banner ? (
              <img
                src={storeInfo.banner}
                style={{ width: "95%", height: "400px" }}
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
              onClick={() => {
                setLogo(true);
              }}
              sx={{
                position: "absolute",
                bottom: "20%",
                left: "50%",
                transform: "translate(-50%, 50%)", // 이동하여 중앙에 위치하게 조정
                width: "150px",
                height: "150px",
                borderRadius: "50%", // 동그라미 모양으로
                backgroundColor: "rgba(0,0,0,1)", // 색상 및 투명도 설정
              }}
            >
              {storeInfo && storeInfo.logo ? (
                <img
                  src={storeInfo.logo}
                  alt="preview"
                  style={{ width: "100%", height: "auto", borderRadius: "50%" }}
                />
              ) : null}
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
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      handleForm(0);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                }
              >
                {storeInfo && !control[0] && storeInfo.storeName}
                {storeInfo && control[0] && (
                  <>
                    <TextField
                      id="storeName"
                      name="storeName"
                      value={storeInfo.storeName}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        handleName(e.target.value);
                      }}
                    />
                    <Button
                      onClick={() => {
                        const newControl = [...control];

                        newControl[0] = false;
                        setControl(newControl);
                      }}
                    >
                      닫기
                    </Button>
                  </>
                )}
              </ListItem>
              <Divider></Divider>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      handleForm(1);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                }
              >
                {storeInfo && !control[1] && storeInfo.storePhone}
                {storeInfo && control[1] && (
                  <>
                    <TextField
                      id="storePhone"
                      name="storePhone"
                      value={storeInfo.storePhone}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        handlePhone(e.target.value);
                      }}
                    />
                    <Button
                      onClick={() => {
                        const newControl = [...control];

                        newControl[1] = false;
                        setControl(newControl);
                      }}
                    >
                      닫기
                    </Button>
                  </>
                )}
              </ListItem>
              <Divider></Divider>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      handleForm(2);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                }
              >
                {storeInfo && !control[2] && storeInfo.content}
                {storeInfo && control[2] && (
                  <>
                    <TextField
                      id="content"
                      name="content"
                      value={storeInfo.content}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        handleContent(e.target.value);
                      }}
                    />
                    <Button
                      onClick={() => {
                        const newControl = [...control];

                        newControl[2] = false;
                        setControl(newControl);
                      }}
                    >
                      닫기
                    </Button>
                  </>
                )}
              </ListItem>
              <Divider></Divider>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      handleForm(3);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                }
              >
                {storeInfo && !control[3] && storeInfo.address}
                {storeInfo && control[3] && (
                  <>
                    <TextField
                      id="address"
                      name="address"
                      value={storeInfo.address}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        handleAddress(e.target.value);
                      }}
                    />
                    <Button
                      onClick={() => {
                        const newControl = [...control];

                        newControl[3] = false;
                        setControl(newControl);
                      }}
                    ></Button>
                  </>
                )}
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
            variant="h4"
            component="h4"
            sx={{
              fontWeight: 500,
            }}
          >
            현재 가게는 {isOpened ? "영업 중" : "닫힘"} 상태입니다.
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontWeight: 500,
            }}
          >
            {isOpened
              ? "오늘의 판매를 종료하려면 가게를 닫아주세요."
              : "오늘의 판매를 시작하려면 가게를 열어주세요."}
          </Typography>
          <Box sx={{ width: "95%", height: "150px", backgroundColor: "grey" }}>
            가게 영업일 정하는 곳
          </Box>
          <Button
            onClick={() => {
              setOpened(!isOpened);
            }}
          >
            {isOpened ? "가게 닫기" : "가게 열기"}
          </Button>
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
        </Paper>

        <Paper elevation={3} sx={{ width: "95%", margin: "10px 0px" }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontWeight: 500,
            }}
          >
            버튼 모음
          </Typography>
          <Button onClick={changeData}> 정보 수정 완료</Button>
        </Paper>

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
      </Grid>
    </>
  );
}
