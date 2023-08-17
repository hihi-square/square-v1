// import React, { useEffect } from "react";
import React, { useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Avatar, Box, Button } from "@mui/material";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import CommentForm from "./CommentForm";

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
};

interface CommentProps {
  comment: CommentEntity;
  commentKey: number;
  onCommentSubmit: (comment: CommentEntity) => void;
  loginUserId: number;
  depth: number;
}

function Comment({
  comment,
  commentKey,
  onCommentSubmit,
  loginUserId,
  depth,
}: CommentProps) {
  const token = localStorage.getItem("accessToken");
  const [toggleBtn, setToggleBtn] = useState<boolean>(false);
  // const [recommentToggleBtn, setRecommentToggleBtn] = useState<boolean>(false);
  const [viewUpdateForm, setViewUpdateForm] = useState<boolean>(false);
  const [viewRecommentForm, setViewRecommentForm] = useState<boolean>(false);

  const handleToggleBtn = () => {
    setToggleBtn(!toggleBtn);
  };
  const handleUpdateForm = (state: boolean) => {
    if (state && viewRecommentForm) {
      handleRecommentForm(false);
    }
    setViewUpdateForm(state);
    setToggleBtn(false);
  };
  const handleRecommentForm = (state: boolean) => {
    if (state && viewUpdateForm) {
      handleUpdateForm(false);
    }
    setViewRecommentForm(state);
    setToggleBtn(false);
  };
  const handleCommentSubmit = (event: any) => {
    // 댓글 제출 완료 후 필요한 작업을 수행하는 로직
    setToggleBtn(false);
    setViewUpdateForm(false);
    setViewRecommentForm(false);
    onCommentSubmit(event);
  };

  const getZeroNum = (num: number) => (num < 10 ? `0${num}` : num);

  const formatTime = (createdAt: number[]) => {
    const [year, month, day, hour, minute] = createdAt;

    const formattedDate = `${year}.${getZeroNum(month)}.${getZeroNum(day)}`;
    const formattedTime = `${getZeroNum(hour)}:${getZeroNum(minute)}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const commentDelete = (commentId: number) => {
    axios({
      url: `${REST_API}community/comment/${commentId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      handleCommentSubmit(event);
    });
  };

  return (
    <Box
      key={commentKey}
      paddingLeft={depth === 1 ? "10px" : "20px"}
      sx={{
        borderRadius: "5px",
        marginY: "10px",
        borderBottom: "1px solid #eee",
        paddingTop: "10px",
      }}
    >
      {comment.isDeleted && <Grid>삭제된 댓글</Grid>}
      {!comment.isDeleted && (
        <Grid
          item
          container
          spacing={1}
          alignItems="center"
          sx={{
            position: "relative",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: "10px",
                }}
              >
                <Avatar
                  src={comment.userProfile}
                  sx={{ width: "33px", height: "33px" }}
                />
              </Grid>
              <Grid>
                <Grid item>
                  <Typography variant="body2">
                    {comment.userNickname}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {formatTime(comment.createdAt)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Button
              onClick={() => handleToggleBtn()}
              sx={{
                fontSize: "20px",
                opacity: "0.5",
              }}
            >
              <HiOutlineDotsCircleHorizontal />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              {comment.comment}
            </Typography>
          </Grid>
          {toggleBtn && (
            <Grid
              sx={{
                display: "flex",
                position: "absolute",
                backgroundColor: "#eee",
                flexDirection: "column",
                right: "0",
                top: "40px",
                zIndex: "10",
              }}
            >
              {depth === 1 && (
                <Button
                  sx={{
                    padding: "10px 20px",
                  }}
                  onClick={() => handleRecommentForm(true)}
                >
                  대댓글
                </Button>
              )}

              {comment && comment.userId === loginUserId && (
                <Button
                  sx={{
                    padding: "10px 20px",
                  }}
                  onClick={() => handleUpdateForm(true)}
                >
                  수정
                </Button>
              )}
              {comment && comment.userId === loginUserId && (
                <Button
                  sx={{
                    padding: "10px 20px",
                  }}
                  onClick={() => commentDelete(comment.commentId)}
                >
                  삭제
                </Button>
              )}
            </Grid>
          )}
          {viewUpdateForm && comment && comment.userId === loginUserId && (
            <Grid
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <Button
                onClick={() => handleUpdateForm(false)}
                sx={{
                  position: "absolute",
                  zIndex: 5,
                  right: 0,
                  bottom: 0,
                }}
              >
                수정 취소
              </Button>
              <CommentForm
                parentId={comment?.commentId}
                onCommentSubmit={handleCommentSubmit}
                type="update"
                text="댓글 수정"
              />
            </Grid>
          )}
        </Grid>
      )}

      {comment &&
        depth === 1 &&
        comment.recommentList.map((recomment) => (
          <Comment
            comment={recomment}
            commentKey={recomment.commentId}
            onCommentSubmit={handleCommentSubmit}
            loginUserId={loginUserId || 0}
            depth={2}
          ></Comment>
        ))}
      {viewRecommentForm && comment && (
        <Grid
          sx={{
            position: "relative",
          }}
        >
          <CommentForm
            parentId={comment?.commentId}
            onCommentSubmit={handleCommentSubmit}
            type="recomment"
            text="댓글 작성"
          />
          <Button
            onClick={() => handleRecommentForm(false)}
            sx={{ zIndex: 5, bottom: 0, right: 0 }}
          >
            작성 취소
          </Button>
        </Grid>
      )}
    </Box>
  );
}

export default Comment;
