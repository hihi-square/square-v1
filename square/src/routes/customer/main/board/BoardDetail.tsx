import React, { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Avatar, Button, Divider, Box } from "@mui/material";
import CommentForm from "./comment/CommentForm"; // CommentForm 컴포넌트의 경로를 적절히 수정
import CommentEntity from "./comment/Comment";
import { createNoSubstitutionTemplateLiteral } from "typescript";

type Comment = {
  commentId: number;
  comment: string;
  createdAt: number[];
  modifiedAt: number[];
  isDeleted: boolean;
  userId: number;
  userNickname: string;
  userProfile: string;
  recommentList: Comment[];
};

type Address = {
  aemId: number;
  bcode: string;
  fullName: string;
  name: string;
  sidoName: string;
  siggAddress: {
    asiId: number;
    bcode: string;
    name: string;
    sidoAddress: {
      asdId: number;
      bcode: string;
      name: string;
    };
  };
};

type Image = {
  // 이미지 정보에 대한 타입 정의
  url: string;
  thumb: string;
};

type PostDetail = {
  boardId: number;
  boardName: string;
  content: string;
  createdAt: number[];
  emdAddress: Address;
  images: Image[];
  isLikePost: boolean;
  latitude: number;
  longitude: number;
  modifiedAt: number[];
  postId: number;
  title: string;
  userId: number;
  userNickname: string;
  viewCnt: number;
  commentCnt: number;
  comments: Comment[];
  userProfile: string;
};

function BoardDetail(props: any) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const urlParams = useParams<{ id: string }>();

  const [id, setPostId] = useState<number>(); // 기본값을 undefined로 설정
  const [post, setPost] = useState<PostDetail>();

  useEffect(() => {
    const parsedId = Number(urlParams.id);

    setPostId(parsedId); // 파싱에 실패하면 undefined로 설정
  }, [urlParams]);

  useEffect(() => {
    if (id !== undefined) {
      getPost();
    }
  }, [id]);

  // const postId = Number(id);

  const getPost = () => {
    axios({
      url: `${REST_API}community/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      console.log(data);
      setPost(data);
    });
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

  const handleCommentSubmit = () => {};

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      <Button
        sx={{
          width: "100%",
          height: "60px",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => {
          navigate("/board");
        }}
      >
        &lt;
      </Button>
      <Grid item xs={12}>
        <Typography variant="h5">{post && post.title}</Typography>
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <Avatar src={post && post.userProfile} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {post && post.userNickname}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {post && formatTime(post.createdAt)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              조회수: {post && post.viewCnt}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="right">{post && post.commentCnt}</Typography>
          </Grid>
        </Grid>
        <Divider style={{ margin: "10px 0" }} />
        <Box minHeight="100px">
          <Typography variant="body1" paragraph>
            {post && post.content}
          </Typography>
        </Box>
      </Grid>

      <Grid>
        {post?.images &&
          post.images.map((photo) => <img src={photo.url}></img>)}
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ margin: "20px 0" }} />
      </Grid>

      <Grid item xs={12}>
        {post &&
          post.comments.map((comment, idx) => (
            <CommentEntity comment={comment} idx={idx}></CommentEntity>
          ))}
        {post && (
          <CommentForm
            parentId={post.postId}
            onCommentSubmit={handleCommentSubmit}
            type="post"
            text="댓글 작성"
          />
        )}
      </Grid>

      <Grid item xs={12}>
        {/* <Typography variant="body1">
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/board/${boardName}/${prevPostId}`)}>
          이전 글: {getPostTitleById(prevPostId)} 
          </span>
        </Typography>
        <Divider style={{ margin: '10px 0' }} />
        <Typography variant="body1">
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/board/${boardName}/${nextPostId}`)}>
          다음 글: {getPostTitleById(nextPostId)} 
          </span>
        </Typography> */}
      </Grid>
    </Grid>
  );
}

export default BoardDetail;
