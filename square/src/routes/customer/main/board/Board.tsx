/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
import { Grid, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "routes/customer/Footer";
import { HiPencilAlt } from "react-icons/hi";

type Post = {
  postId: number;
  title: string;
  content: string;
  createdAt: number[];
  commentCount: number;
  isLike: boolean;
  latitude: number;
  longitude: number;
  thumbnail: {
    url: string;
    thumb: string;
  };
  userId: number;
  userNickname: string;
  userProfile: string | null;
  viewCount: number;
};

type UserInfo = {
  bcode: number;
  depth: number;
  emdName: string;
  fullName: string;
  sidoName: string;
  siggName: string;
  usrId: number;
  usrNick: string;
};

const getZeroNum = (num: number) => (num < 10 ? `0${num}` : num);

const formatTime = (createdAt: number[]) => {
  const [year, month, day, hour, minute] = createdAt;
  const date = new Date();

  const formattedDate = `${year}.${getZeroNum(month)}.${getZeroNum(day)}`;
  const formattedTime = `${getZeroNum(hour)}:${getZeroNum(minute)}`;

  const postDate = `${year}-${month}-${day}`;
  const nowDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  if (nowDate > postDate) return formattedDate;
  else return formattedTime;
};

function Board() {
  const token = sessionStorage.getItem("accessToken");
  const [userLocation, setUserLocation] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>();
  const [bCode, setBCode] = useState<number>(3020011300);
  const [depth, setDepth] = useState<number>(1);

  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUserInfo = sessionStorage.getItem("userInfo");

    if (storedUserInfo) {
      const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo);

      setUserLocation(parsedUserInfo.fullName);
      setBCode(parsedUserInfo.bcode);
      setDepth(parsedUserInfo.depth);
    }
  }, []);

  React.useEffect(() => {
    if (bCode !== undefined && depth !== undefined) getPosts(); // setBCode와 setDepth 이후에 실행됩니다.
  }, [bCode, depth]);

  const getPosts = () => {
    if (bCode !== undefined && depth !== undefined) {
      axios({
        url: `${REST_API}community/1/${bCode}/${depth}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(({ data }) => {
        setPosts(data.posts);
      });
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/board/${postId}`);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        align="center"
        style={{
          marginBottom: "5px",
          position: "fixed",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "70px",
        }}
      >
        {userLocation}
      </Typography>
      <Grid
        container
        sx={{
          marginTop: "70px",
          marginBottom: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {posts &&
          posts.map((post: Post, index: number) => (
            <React.Fragment key={post.postId}>
              <Grid
                sx={{
                  width: "100vw",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                    cursor: "pointer",
                    height: "70px",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => handlePostClick(post.postId)}
                >
                  <Box
                    sx={{ display: "flex", width: "85%", alignItems: "center" }}
                  >
                    {post.thumbnail && post.thumbnail.url && (
                      // <Box style={{ marginRight: "10px", width: "40px" }}>
                      //   <img src={post.thumbnail.url} width={40} alt="썸네일" />
                      // </Box>
                      <Box
                        sx={{
                          marginRight: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="/img/store/store1.png"
                          alt="썸네일"
                          style={{
                            width: "65px",
                            height: "65px",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    )}
                    <Box
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "90%",
                        height: "55px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="body2">
                        {post.userNickname} {formatTime(post.createdAt)} 조회{" "}
                        {post.viewCount}회
                      </Typography>
                    </Box>
                  </Box>
                  {post.commentCount > 0 && (
                    <Box>
                      <Typography
                        variant="body1"
                        style={{
                          // backgroundColor: "#eee",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {post.commentCount}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </React.Fragment>
          ))}
        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            right: 20,
            width: "70px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#bbdfc8",
            borderRadius: 100,
            boxShadow: "0px 0px 4px 2px rgba(24, 57, 43, 0.4)",
          }}
        >
          <Button
            sx={{
              width: "70px",
              height: "70px",
              display: "flex",
              borderRadius: 100,
              flexDirection: "column",
            }}
            onClick={() => {
              navigate("/board/write");
            }}
          >
            <HiPencilAlt fontSize={30} />
          </Button>
        </Box>
      </Grid>
      <Footer now={3} />
    </Box>
  );
}

export default Board;
