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
      const croppedCanvas = cropper.getCroppedCanvas();

      handleCurrProduct("image", croppedCanvas.toDataURL());

      // thumbnail 생성
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const thumbnailWidth = 150;
      const aspectRatio = croppedCanvas.width / croppedCanvas.height;
      const thumbnailHeight = thumbnailWidth / aspectRatio;

      ctx?.drawImage(croppedCanvas, 0, 0, thumbnailWidth, thumbnailHeight);
      handleCurrProduct("thumbnail", canvas.toDataURL("image/jpeg"));
      setCroppedImage(croppedCanvas.toDataURL());
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
              width: "300px",
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
              height: "300px",
              width: "300px",
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
