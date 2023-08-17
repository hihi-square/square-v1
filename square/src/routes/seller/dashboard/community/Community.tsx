/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Button,
  Divider,
  //   Paper,
  //   Pagination,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  boardId: number;
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

export default function Community() {
  const token = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState<Post[]>();
  const [boardId, setBoardId] = useState<number>(1);
  const [bCode, setBCode] = useState<number>(3020011300);
  const [depth, setDepth] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    setBCode(3020011300);
    setDepth(2);
    setBoardId(boardId);
    getPosts();
  }, []);

  useEffect(() => {
    if (boardId === 4) {
      axios({
        url: `${REST_API}community`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data }) => {
          console.log(data);
          setPosts(data.posts);
        })
        .catch((error) => console.log(error));
    } else {
      getPosts();
    }
  }, [boardId]);

  const getPosts = () => {
    axios({
      url: `${REST_API}community/${boardId}/${bCode}/${depth}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        setPosts(data.posts);
      })
      .catch((error) => console.log(error));
  };

  const handlePostClick = (postId: number) => {
    navigate(`/seller/community/${postId}`);
  };

  const handleBoardId = (boardNum: number) => {
    setBoardId(boardNum);
  };

  return (
    <Grid
      container
      xs={12}
      sx={{ marginTop: 3, marginLeft: 5, marginRight: 10 }}
      flexDirection="column"
    >
      <Typography
        variant="h3"
        sx={{ marginBottom: 2, color: "#225a41", fontWeight: 700 }}
      >
        {" "}
        커뮤니티{" "}
      </Typography>
      <Grid sx={{ marginTop: 1 }}>
        <Button
          sx={{ fontSize: 18, color: boardId === 1 ? "#8ec7a7" : "#225a41" }}
          onClick={() => handleBoardId(1)}
        >
          자유 게시판
        </Button>
        <Button
          sx={{ fontSize: 18, color: boardId === 3 ? "#8ec7a7" : "#225a41" }}
          onClick={() => handleBoardId(3)}
        >
          사장님 게시판
        </Button>
        <Button
          sx={{ fontSize: 18, color: boardId === 4 ? "#8ec7a7" : "#225a41" }}
          onClick={() => handleBoardId(4)}
        >
          내 게시물
        </Button>
        <Box sx={{ borderBottom: "3px solid #e0e0e0" }} />
        <div style={{ position: "relative" }}>
          <Grid
            container
            justifyContent="flex-end"
            style={{ position: "fixed", bottom: 30, left: -70, width: "100%" }}
          >
            <Button
              sx={{
                background: "#8ec7a7",
                width: "90px",
                height: "60px",
                fontSize: 20,
                marginTop: 1,
                marginRight: 2,
                "&:hover": {
                  background: "#bbdfc8", // 호버 시 배경색 변경
                },
              }}
              onClick={() => {
                navigate("/seller/community/write");
              }}
            >
              글 작성
            </Button>
          </Grid>
        </div>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "5px" }}>
        {posts &&
          posts.map((post: Post, index: number) => (
            <React.Fragment key={post.postId}>
              {index !== 0 && (
                <Divider
                  variant="middle"
                  sx={{ width: "100%", margin: "10px 0" }}
                />
              )}
              <Grid
                xs={12}
                sx={{
                  "&:hover": {
                    background: "#dcefe2", // 호버 시 배경색 변경
                  },
                }}
              >
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
                      <img src={post.thumbnail.url} width={50} />
                    </Box>
                  )}
                  <Box style={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{ padding: "10px 0", fontWeight: "600" }}
                    >
                      {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {post.userNickname} | {formatTime(post.createdAt)} |
                      조회수: {post.viewCount}{" "}
                      {boardId === 4 && `| ${post.boardId}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      style={{
                        width: "50px",
                        height: "70px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#eee",
                        borderRadius: "30%",
                        padding: "5px 10px",
                      }}
                    >
                      <span>{post.commentCount}</span>
                      <span>댓글</span>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </React.Fragment>
          ))}
        <Box
          sx={{
            position: "absolute",
          }}
        >
          {/* <Button
            sx={{
              width: "100%",
              height: "60px",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              navigate("/seller/dashboard/community/write");
            }}
          >
            작성
          </Button> */}
        </Box>
      </Grid>
    </Grid>
  );
}
