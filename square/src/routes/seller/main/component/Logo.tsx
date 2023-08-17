import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";

import { Unstable_Grid2 as Grid, Box, Button, TextField } from "@mui/material";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { REST_API } from "redux/redux";

interface Props {
  setLogo: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogo: (imageURL: string, type: number) => void;
}

export default function Logo({ setLogo, handleLogo }: Props) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [image, setImage] = useState<string | undefined>("");
  const [croppedImage, setCroppedImage] = useState<string | null>("");
  // const [finalData, setFinalData] = useState<string>("");

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

  // 이미지를 업로드합니다.
  const postImage = () => {
    const formData = new FormData();

    if (croppedImage) {
      const imageBlob = dataURLToBlob(croppedImage);

      formData.append("image", imageBlob, fileName);

      axios
        .post(`${REST_API}api/file/logo`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          handleLogo(resp.data.url, 2);
        })
        .catch(() => {});
    }
  };

  // 이미지 파일을 올리면 파일을 바꿉니다.
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const MAX_SIZE = 5 * 1024 * 1024; // 최대 5MB

    if (file && file.size > MAX_SIZE) {
      return;
    }

    if (file) {
      // 파일이 있으면 파일명을 설정합니다.
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      setImage("");
      setFileName("");
    }
  };

  // 올리는 사진을 크롭합니다.
  const handleCrop = () => {
    const cropper = cropperRef?.current?.cropper;

    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 150,
        height: 150,
        fillColor: "#fff", // 배경색 (필요하면 설정하세요)
      });

      setCroppedImage(croppedCanvas.toDataURL());
    }
  };

  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Cropper src={image} ref={cropperRef} />
      {croppedImage && (
        <Box
          sx={{
            width: "150px",
            height: "150px",
            borderRadius: "50%", // 동그라미 모양으로
            backgroundColor: "rgba(0,0,0,1)", // 색상 및 투명도 설정
          }}
        >
          <img
            src={croppedImage}
            alt="preview"
            style={{ width: "100%", height: "auto", borderRadius: "50%" }}
          />
        </Box>
      )}

      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image"
        name="image"
        type="file"
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
          />
        </Box>
      </label>
      <br />
      <Button onClick={handleCrop}> 이미지 자르기 </Button>
      <Button
        onClick={() => {
          setLogo(false);
        }}
      >
        {" "}
        닫기{" "}
      </Button>
      {fileName && croppedImage && (
        <Button
          onClick={() => {
            postImage();
            setLogo(false);
          }}
        >
          {" "}
          등록{" "}
        </Button>
      )}
    </Grid>
  );
}
