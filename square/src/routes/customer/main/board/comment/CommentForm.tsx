import React, { useState } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Button,
  TextareaAutosize,
} from "@mui/material";

interface CommentFormProps {
  parentId: number;
  onCommentSubmit: (event: any) => void;
  type: string;
  text: string;
}

function CommentForm({
  parentId,
  onCommentSubmit,
  type,
  text,
}: CommentFormProps) {
  const [comment, setComment] = useState("");
  const token = sessionStorage.getItem("accessToken");

  const handleSuccessSubmit = (event: any) => {
    onCommentSubmit(event); // 부모 컴포넌트에 댓글 제출 완료를 알림
    setComment(""); // 댓글 입력 필드 초기화
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (comment.trim() === "") {
      return; // 댓글 내용이 비어있으면 제출하지 않음
    }

    if (type === "post") {
      // 게시글 댓글
      const body = {
        postId: parentId,
        comment,
      };

      axios({
        url: `${REST_API}community/comment`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      }).then(() => {
        handleSuccessSubmit(event);
      });
    } else if (type === "recomment") {
      // 대댓글
      const body = {
        commentId: parentId,
        comment,
      };

      axios({
        url: `${REST_API}community/comment/recomment`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      }).then(() => {
        handleSuccessSubmit(event);
      });
    } else if (type === "update") {
      // 댓글 수정
      const body = {
        commentId: parentId,
        comment,
      };

      axios({
        url: `${REST_API}community/comment`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      }).then(() => {
        handleSuccessSubmit(event);
      });
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "gray",
        width: "100%",
      }}
    >
      <TextareaAutosize
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={text}
        minRows={3}
        style={{
          width: "100%",
          resize: "none",
          padding: "10px 60px 10px 10px",
        }}
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        sx={{
          position: "absolute",
          right: 0,
        }}
      >
        {text}
      </Button>
    </Grid>
  );
}

export default CommentForm;
