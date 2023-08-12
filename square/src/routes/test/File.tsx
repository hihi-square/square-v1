import React, { ChangeEvent, useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import { REST_API } from "redux/redux";

export default function File() {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<string | undefined>("");
  const [thumbnail, setThumbnail] = useState<string | null>("");
  const [fileName, setFileName] = useState<string | undefined>(
    "상품 이미지를 업로드 해주세요."
  ); // state for file name
  const [croppedImage, setCroppedImage] = useState<string | null>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const [imageResp, setImageResp] = useState<string>("");
  const [thumbResp, setThumbResp] = useState<string>("");

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes

    if (file && file.size > MAX_SIZE) {
      setHelperText(
        "파일 크기가 너무 큽니다. 5MB 이하의 파일만 업로드 가능합니다."
      );
      setError(true);
      return;
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name); // update file name state
    } else {
      setImage(""); // reset image preview if no file selected
      setFileName(""); // reset file name state
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef?.current?.cropper;

    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();

      setCroppedImage(croppedCanvas.toDataURL());

      // thumbnail 생성
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const thumbnailSize = 150;

      canvas.width = thumbnailSize;
      canvas.height = thumbnailSize;

      ctx?.drawImage(croppedCanvas, 0, 0, thumbnailSize, thumbnailSize);
      setThumbnail(canvas.toDataURL("image/jpeg"));
    }
  };
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

  const postImage = () => {
    const formData = new FormData();

    if (croppedImage && thumbnail) {
      const imageBlob = dataURLToBlob(croppedImage);
      const thumbBlob = dataURLToBlob(thumbnail);

      formData.append("image", imageBlob, fileName);
      formData.append("thumb", thumbBlob, `th${fileName}`);

      axios
        .post(`${REST_API}api/file/thumb/test`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setImageResp(response.data.file.url);
          setThumbResp(response.data.file.thumb);
        })
        .catch((err) => {
          console.log("gd");
          console.log(err);
        });
    }
  };

  return (
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
        <img
          src={croppedImage}
          alt="preview"
          style={{ height: "300px", width: "300px" }}
        />
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
      <Button onClick={postImage}> 전송해보기 </Button>
      <div>
        <img src={imageResp} alt="사진" />
      </div>
      <div>
        <img src={thumbResp} alt="섬네일" />
      </div>
    </div>
  );
}
