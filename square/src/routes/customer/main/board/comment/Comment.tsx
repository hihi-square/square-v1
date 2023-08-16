import React, { useEffect } from "react";
// import React, { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Avatar, Box, Button } from "@mui/material";
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
}


function Comment({ comment, commentKey, onCommentSubmit, loginUserId }: CommentProps) {
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {}, []);
  const handleCommentSubmit = (event: any) => {
    // 댓글 제출 완료 후 필요한 작업을 수행하는 로직
    onCommentSubmit(event);
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
      border="1px solid #e0e0e0"
      borderRadius="5px"
      marginY="10px"
      padding="10px"
    >
      {comment.isDeleted && <Grid>삭제된 댓글</Grid>}
      {!comment.isDeleted && (
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <Avatar src={comment.userProfile} sx={{ width: 24, height: 24 }} />
          </Grid>
          <Grid item>
            <Typography variant="body2">{comment.userNickname}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {formatTime(comment.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              {comment.comment}
            </Typography>
          </Grid>
          {comment && comment.userId === loginUserId && (
            <Grid>
              <Button onClick={() => commentDelete(comment.commentId)}>
                삭제
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
        comment.recommentList.map((recomment) => (
          <Box
            key={recomment.commentId}
            border="1px solid #e0e0e0"
            borderRadius="5px"
            marginY="10px"
            padding="10px"
          >
            <Grid item container spacing={1} alignItems="center">
              <Grid item>
                <Avatar
                  src={recomment.userProfile}
                  sx={{ width: 24, height: 24 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  {recomment.userNickname}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  {formatTime(recomment.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" paragraph>
                  {recomment.comment}
                </Typography>
              </Grid>
            </Grid>
            {recomment && recomment.userId === loginUserId && (
              <Grid>
                <Button onClick={() => commentDelete(recomment.commentId)}>
                  삭제
                </Button>
                <CommentForm
                  parentId={recomment?.commentId}
                  onCommentSubmit={handleCommentSubmit}
                  type="update"
                  text="댓글 수정"
                />
              </Grid>
            )}
          </Box>
        ))}
      {comment && comment.userId === loginUserId && (
        <CommentForm
          parentId={comment?.commentId}
          onCommentSubmit={handleCommentSubmit}
          type="recomment"
          text="대댓글 작성"
        />
      )}
    </Box>
  );
}

export default Comment;
