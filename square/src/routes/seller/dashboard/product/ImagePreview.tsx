import React, { ChangeEvent, useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface ImagePreviewProps {
  error: boolean;
  helperText: string;
  handleCurrProduct: (key: string, value: string | number | boolean) => void;
  setFileName: React.Dispatch<React.SetStateAction<string | undefined>>;
  fileName: string | undefined;
  thumbnail: string | undefined;
}

function ImagePreview({
  error,
  helperText,
  handleCurrProduct,
  setFileName,
  fileName,
  thumbnail,
}: ImagePreviewProps) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<string | undefined>("");
  const [croppedImage, setCroppedImage] = useState<string | null>("");

  // 이미지 파일을 올리면 파일을 바꿉니다.
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const MAX_SIZE = 10 * 1024 * 1024; // 최대 5MB

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
      const croppedCanvas = cropper.getCroppedCanvas();

      // 300x300의 크기의 캔버스 생성
      const finalCanvas = document.createElement("canvas");

      finalCanvas.width = 300;
      finalCanvas.height = 300;
      const ctxFinal = finalCanvas.getContext("2d");

      // 배경을 흰색으로 설정
      if (ctxFinal) {
        ctxFinal.fillStyle = "#FFFFFF";
        ctxFinal.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        // 크롭된 이미지를 중앙에 위치시킴
        // 크롭된 이미지의 비율에 따라 크기 조절
        let newWidth;
        let newHeight;
        const aspectRatio = croppedCanvas.width / croppedCanvas.height;

        if (croppedCanvas.width > croppedCanvas.height) {
          newWidth = 300;
          newHeight = 300 / aspectRatio;
        } else {
          newHeight = 300;
          newWidth = 300 * aspectRatio;
        }

        // 크롭된 이미지를 중앙에 배치
        const offsetX = (300 - newWidth) / 2;
        const offsetY = (300 - newHeight) / 2;

        ctxFinal.drawImage(
          croppedCanvas,
          0,
          0,
          croppedCanvas.width,
          croppedCanvas.height,
          offsetX,
          offsetY,
          newWidth,
          newHeight
        );

        handleCurrProduct("image", finalCanvas.toDataURL());
      }

      // thumbnail 생성
      const thumbnailCanvas = document.createElement("canvas");

      thumbnailCanvas.width = 150;
      thumbnailCanvas.height = 150;
      const ctxThumbnail = thumbnailCanvas.getContext("2d");

      if (ctxThumbnail) {
        ctxThumbnail.drawImage(finalCanvas, 0, 0, 150, 150);

        handleCurrProduct("thumbnail", thumbnailCanvas.toDataURL("image/jpeg"));
        setCroppedImage(finalCanvas.toDataURL());
      }
    }
  };

  return (
    <div>
      <div
        style={{
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
              display: "flex",
              alignItems: "center",
              height: "300px",
              width: "auto",
            }}
          >
            <img
              src={croppedImage}
              alt="preview"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        )}
        {!fileName && thumbnail && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "150px",
              width: "auto",
            }}
          >
            <img
              src={thumbnail}
              alt="preview"
              style={{ width: "100%", height: "auto" }}
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
              error={Boolean(error)}
              helperText={helperText}
              inputProps={{ readOnly: true }}
            />
          </Box>
        </label>
        <br />
        <Button onClick={handleCrop}> 이미지 자르기 </Button>
      </div>
    </div>
  );
}

export default ImagePreview;
