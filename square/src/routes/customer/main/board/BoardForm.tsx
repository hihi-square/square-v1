import React, { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
// import { Grid, Button, Typography, Divider } from "@mui/material";
import { Grid, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "routes/customer/Footer";

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
};

// const getZeroNum = (num: number) => (num < 10 ? `0${num}` : num);

// const formatTime = (createdAt: number[]) => {
//   const [year, month, day, hour, minute, second] = createdAt;

//   const formattedDate = `${year}-${getZeroNum(month)}-${getZeroNum(day)}`;
//   const formattedTime = `${getZeroNum(hour)}:${getZeroNum(minute)}:${
//     second ? getZeroNum(second) : "00"
//   }`;

//   return `${formattedDate} ${formattedTime}`;
// };

function BoardForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handlePhotoChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    // setSelectedPhotos(selectedFiles);
  };

  const handlePostSubmit = (e: any) => {
    e.preventDefault();
    // 게시글 데이터와 사진 업로드 처리
    const postData = {
      title: title,
      content: content,
    };

    console.log("게시글 데이터:", postData);
    // console.log("선택된 사진:", selectedPhotos);

    // 서버로 데이터 전송 및 처리 로직 추가
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handlePostSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <label htmlFor="photos">사진 업로드</label>
          <input
            type="file"
            id="photos"
            value={photos}
            multiple
            onChange={handlePhotoChange}
          />
        </div>
        <button type="submit">게시글 작성</button>
      </form>
    </div>
  );
}

export default BoardForm;
