import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";

import {
  Unstable_Grid2 as Grid,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { REST_API } from "redux/redux";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // handleBanner: (imageURL: string, type: number) => void;
}

// dataURL을 Blob으로 바꿉니다.
const dataURLToBlob = (dataURL: string) => {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

export default function FeedImage({ setOpen }: Props) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [fileName, setFileName] = useState<string[]>([]);
  const [image, setImage] = useState<string>();
  // const [isCropped, setCropped] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  // const [finalData, setFinalData] = useState<string>("");

  // 이미지를 업로드합니다.
  const postImage = () => {
    const formData = new FormData();

    if (croppedImage) {
      const imageBlob = dataURLToBlob(croppedImage[0]);

      formData.append("image", imageBlob, fileName[0]);

      axios
        .post(`${REST_API}api/file/banner`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch(() => {});
    }
  };

  // 이미지 파일을 올리면 파일을 바꿉니다.
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const MAX_SIZE = 10 * 1024 * 1024; // 최대 10MB

    if (file && file.size > MAX_SIZE) {
      setError("파일 크기가 10MB를 넘어갑니다.");
      return;
    }

    if (file) {
      // 파일이 있으면 파일명을 설정합니다.
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName((prev) => [...prev, file.name]);
    }
  };

  const handleResize = () => {
    const cropper = cropperRef?.current?.cropper;

    if (cropper) {
      // 현재 크롭된 이미지를 가져옵니다.
      const croppedCanvas = cropper.getCroppedCanvas();

      // 새 Canvas를 생성하여 이미지를 리사이즈합니다.
      const canvas = document.createElement("canvas");

      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");

      ctx?.drawImage(croppedCanvas, 0, 0, 400, 300);

      setCroppedImage([...croppedImage, canvas.toDataURL()]);
    }
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <Grid xs={11}>
        <Typography
          variant="body2"
          component="div"
          sx={{
            fontWeight: 500,
          }}
        >
          이미지 파일을 첨부해주세요. (10MB 제한)
        </Typography>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image"
          name="image"
          type="file"
          disabled={croppedImage.length === 5}
          onChange={(event) => {
            handleImageUpload(event);
          }}
        />
        <label htmlFor="image" style={{ width: "100%" }}>
          <Box onClick={() => document.getElementById("image")?.click()}>
            <TextField
              variant="outlined"
              fullWidth
              value={fileName}
              inputProps={{ readOnly: true }}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
        </label>
      </Grid>
      <Grid xs={11}>
        <Cropper src={image} ref={cropperRef} style={{ width: "100%" }} />
      </Grid>
      <Grid xs={11}>
        <Typography
          variant="body2"
          component="div"
          sx={{
            fontWeight: 500,
            marginLeft: "30px",
          }}
        >
          크롭된 결과물 (400x300px)
        </Typography>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          height: "300px",
          width: "400px",
          backgroundColor: "grey",
        }}
      >
        {croppedImage &&
          croppedImage.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt="preview"
              style={{ width: "100%", height: "auto" }}
            />
          ))}
      </Grid>

      <br />
      <Button onClick={handleResize}>이미지 자르기(비율 유지)</Button>

      <Button
        onClick={() => {
          setOpen(false);
        }}
      >
        닫기
      </Button>
      {fileName && croppedImage && (
        <Button
          onClick={() => {
            postImage();
            setOpen(false);
          }}
        >
          등록
        </Button>
      )}
    </Grid>
  );
}
