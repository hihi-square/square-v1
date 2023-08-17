/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
import { Grid, Button, Typography, Divider, Box } from "@mui/material";
// import { Grid, Typography, Divider } from "@mui/material";
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
  const [year, month, day, hour, minute, second] = createdAt;

  const formattedDate = `${year}-${getZeroNum(month)}-${getZeroNum(day)}`;
  const formattedTime = `${getZeroNum(hour)}:${getZeroNum(minute)}:${
    second ? getZeroNum(second) : "00"
  }`;

  return `${formattedDate} ${formattedTime}`;
};

function Board() {
  const token = sessionStorage.getItem("accessToken");
  const [userLocation, setUserLocation] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>();
  // const [userInfo, setUserInfo] = useState<UserInfo>();
  const [bCode, setBCode] = useState<number>(3020011300);
  const [depth, setDepth] = useState<number>(1);

  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUserInfo = sessionStorage.getItem("userInfo");

    if (storedUserInfo) {
      const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo);

      // setUserInfo(parsedUserInfo);
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
        style={{ marginTop: "15px", marginBottom: "5px" }}
      >
        {userLocation}
      </Typography>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {posts &&
          posts.map((post: Post, index: number) => (
            <React.Fragment key={post.postId}>
              {index !== 0 && (
                <Divider
                  variant="middle"
                  sx={{ width: "100%", margin: "10px 0" }}
                />
              )}
              <Grid item xs={12}>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePostClick(post.postId)}
                >
                  {post.thumbnail && post.thumbnail.url && (
                    <Box style={{ marginRight: "10px" }}>
                      <img src={post.thumbnail.url} width={50} alt="썸네일" />
                    </Box>
                  )}
                  <Box style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2">
                      {post.userNickname} | {formatTime(post.createdAt)} |
                      조회수: {post.viewCount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      style={{
                        backgroundColor: "#eee",
                        borderRadius: "50%",
                        padding: "5px 10px",
                      }}
                    >
                      {post.commentCount}
                    </Typography>
                  </Box>
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
