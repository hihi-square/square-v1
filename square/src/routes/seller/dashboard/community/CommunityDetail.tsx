import React, { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Avatar, Button, Divider, Box } from "@mui/material";
import CommentForm from "./comment/CommentForm"; // CommentForm 컴포넌트의 경로를 적절히 수정
import Comment from "./comment/Comment";
// import { createNoSubstitutionTemplateLiteral } from "typescript";

type CommentEntity = {
  commentId: number;
  comment: string;
  createdAt: number[];
  modifiedAt: number[];
  isDeleted: boolean;
  userId: number;
  userNickname: string;
  userProfile: string;
  recommentList: CommentEntity[];
  depth: number;
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
  comments: CommentEntity[];
  userProfile: string;
};

type StoreInfo = {
  userId: number;
  userNick: string;
};

function BoardDetail(props: any) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const urlParams = useParams<{ id: string }>();

  const [id, setPostId] = useState<number>(); // 기본값을 undefined로 설정
  const [post, setPost] = useState<PostDetail>();
  const [isUpdate, setIsUpdate] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<StoreInfo | null>(null);

  useEffect(() => {
    const parsedId = Number(urlParams.id);

    setPostId(parsedId); // 파싱에 실패하면 undefined로 설정
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedUserInfo) {
      const parsedUserInfo: StoreInfo = JSON.parse(storedUserInfo);

      setUserInfo(parsedUserInfo);
    }
  }, [urlParams]);

  useEffect(() => {
    if (id !== undefined) {
      getPost();
    }
  }, [id]);

  useEffect(() => {
    if (isUpdate) {
      getPost();
      setIsUpdate(false);
    }
  }, [isUpdate]);

  // const postId = Number(id);

  const getPost = () => {
    axios({
      url: `${REST_API}community/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
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

  const handleCommentSubmit = () => {
    setIsUpdate(true);
  };
  const handlePostDelete = () => {
    axios({
      url: `${REST_API}community/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      navigate("/seller/dashboard/community");
    });
  };

  return (
    <Grid
      container
      spacing={3}
      style={{ padding: "20px 10px", marginLeft: 5, marginRight: 50 }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: 2 }}
      >
        <Button
          sx={{
            // width: "100%",
            height: "60px",
            display: "flex",
            justifyContent: "flex-start",
          }}
          onClick={() => {
            navigate("/seller/dashboard/community");
          }}
        >
          <TbArrowBackUp size="30px" style={{ marginLeft: 10 }} />
        </Button>
        {post && post.userId === userInfo?.userId && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              sx={{
                // width: "100%",
                height: "60px",
                fontSize: "18px",
                fontWeight: "200px",
                // display: "flex",
                // flexDirection: "column",
              }}
              onClick={() => {
                navigate(`/seller/dashboard/community/update/${id}`);
              }}
            >
              수정
            </Button>
            <Button
              sx={{
                // width: "100%",
                height: "60px",
                fontSize: "18px",
                fontWeight: "200px",
                // display: "flex",
                // flexDirection: "column",
              }}
              onClick={() => {
                handlePostDelete();
              }}
            >
              삭제
            </Button>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: 0 }}>
        <Typography variant="h4" sx={{ paddingBottom: 3, fontWeight: "600" }}>
          {post && post.title}
        </Typography>
        <Grid
          item
          container
          spacing={1}
          alignItems="center"
          sx={{ paddingBottom: 2 }}
        >
          <Grid item>
            <Avatar src={post && post.userProfile} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {post && post.userNickname}
            </Typography>
            <Grid item container spacing={1} alignItems="center">
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
            </Grid>
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
        <Divider style={{ marginTop: "10px" }} />
      </Grid>
      <Grid item xs>
        <Typography align="left" sx={{ fontSize: "16px", fontWeight: "500" }}>
          댓글 {post && post.commentCnt}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {
          post &&
            post.comments.map((comment) =>
              // (
              {
                console.log("Comment Depth:", comment.depth);

                return (
                  <Comment
                    depth={comment.depth}
                    comment={comment}
                    commentKey={comment.commentId}
                    onCommentSubmit={handleCommentSubmit}
                    loginUserId={userInfo?.userId || 0}
                  ></Comment>
                );
              }
            )
          // )
        }
        {post && (
          <CommentForm
            parentId={post.postId}
            onCommentSubmit={handleCommentSubmit}
            type="post"
            text="작성"
          />
        )}
      </Grid>
    </Grid>
  );
}

export default BoardDetail;
