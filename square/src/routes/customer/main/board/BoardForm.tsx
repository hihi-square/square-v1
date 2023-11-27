import React, { useEffect, useState } from "react";
// import React, { ChangeEvent, useState } from "react";
// import React, { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  Box,
  Button,
  TextareaAutosize,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";

// type PostImage = {
//   url:string;
//   thumb:string;
// }

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

interface FormTypeProps {
  mode: string;
}
function BoardForm({ mode }: FormTypeProps) {
  const token = sessionStorage.getItem("accessToken");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem("userInfo");

    if (storedUserInfo) {
      const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo);

      setUserInfo(parsedUserInfo);
    }
  }, []);

  useEffect(() => {
    if (mode === "update") {
      // 기존 데이터를 불러와서 표시
      axios({
        url: `${REST_API}community/update/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data }) => {
          setTitle(data.title);
          setContent(data.content);
        })
        .catch((error) => {});
    }
  }, [mode, id]);

  // const [images, setImages] = useState([]);
  // // const [photos, setPhotos] = useState(d[]);
  // const [selectedPhotos, setSelectedPhotos] = useState([]);
  // const [fileName, setFileName] = useState<string>("");
  // const [image, setImage] = useState<string | undefined>("");

  // // dataURL을 Blob으로 바꿉니다.
  // const dataURLToBlob = (dataURL: string) => {
  //   const byteString = atob(dataURL.split(",")[1]);
  //   const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);

  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   return new Blob([ab], { type: mimeString });
  // };

  // // 이미지를 업로드합니다.
  // const postImage = () => {

  // };

  // // 이미지 파일을 올리면 파일을 바꿉니다.
  // const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   const MAX_SIZE = 5 * 1024 * 1024; // 최대 5MB

  //   if (files) {
  //     // 여기
  //     }else {
  //   setImage("");
  //   setFileName("");
  // }
  // };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") return;
    // 게시글 데이터와 사진 업로드 처리
    if (mode === "write") {
      const postData = {
        boardId: 1,
        bcode: userInfo?.bcode,
        title,
        content,
        images: [],
        latitude: 36.3481000221941,
        longitude: 127.29858777113043,
      };

      // console.log("선택된 사진:", selectedPhotos);

      // 서버로 데이터 전송 및 처리 로직 추가
      axios({
        url: `${REST_API}community`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: postData,
      }).then(({ data }) => {
        navigate(`/board/${data.id}`);
      });
    } else if (mode === "update") {
      const postData = {
        postId: id,
        title,
        content,
        images: [],
      };

      // console.log("선택된 사진:", selectedPhotos);

      // 서버로 데이터 전송 및 처리 로직 추가
      axios({
        url: `${REST_API}community`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: postData,
      }).then(() => {
        navigate(`/board/${id}`);
      });
    }
  };

  return (
    <Grid container xs={12} direction="column">
      <Grid container xs={12} justifyContent="center">
        <Grid xs={9}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            글작성
          </Typography>
          <Box component="form">
            <Box
              sx={{
                marginBottom: "20PX",
              }}
            >
              <TextField
                placeholder="제목"
                fullWidth
                value={title}
                onChange={handleTitle}
                autoComplete="title"
              />
            </Box>
            <Box sx={{ height: "40vh", marginBottom: "15px" }}>
              <TextareaAutosize
                placeholder="내용"
                style={{
                  width: "100%",
                  height: "100%",
                  boxSizing: "border-box",
                  padding: "15px",
                }}
                value={content}
                onChange={handleContent}
                autoComplete="content"
              />
            </Box>
          </Box>
        </Grid>
        <Grid container xs={9} justifyContent="center">
          <Grid xs={12}>
            <Button
              onClick={handleFormSubmit}
              variant="contained"
              sx={{ height: "60px" }}
              fullWidth
            >
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {mode === "write" ? "작성" : "수정"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BoardForm;
