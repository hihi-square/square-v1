import React, { useState, useRef, useEffect  } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import { Grid } from "@mui/material";

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
  const token = localStorage.getItem("accessToken");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSuccessSubmit = (event: any) => {
    onCommentSubmit(event); // 부모 컴포넌트에 댓글 제출 완료를 알림
    setComment(""); // 댓글 입력 필드 초기화
    adjustTextareaHeight(); // 댓글 입력 후 텍스트 크기 조정
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

  useEffect(() => {
    adjustTextareaHeight(); // 컴포넌트가 마운트되면 텍스트 크기 조정
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Height 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 높이 조정
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", marginRight: "20px"}}>
      <Grid container alignItems="center" spacing={2}>
      <Grid item xs={11}>
      <textarea
        ref={textareaRef}
        style={{width: "100%", 
        height: "auto", 
        fontSize: "15px", 
        border: "0",
        borderRadius: "15px",
        outline: "0",
        paddingLeft: "10px",
        backgroundColor: "rgb(233, 233, 233)",
        resize: "none",
        lineHeight: "25px"
        }}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          adjustTextareaHeight(); // 텍스트 변경 시 텍스트 크기 조정
        }}
        placeholder=""
      />
      </Grid>
      <Grid item xs={1}>
      <button type="submit" style={{ marginLeft: "10px",
      // background: "#8ec7a7",
      backgroundColor: "#dcefe2",
      width: "80px",
      height: "50px",
      fontSize: 15,
      fontWeight: "800",
      color: "#1d4835",
      cursor:"pointer",
      marginTop: 1,
      marginRight: 2,
      border: 0,
      borderRadius: "15px",
    }} >{text}</button>
      </Grid>
      </Grid>
    </form>
  );
}

export default CommentForm;
