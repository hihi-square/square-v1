import React, { useState, useEffect } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import { Iproduct } from "modules/types";
import {
  Unstable_Grid2 as Grid,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";

import ImagePreview from "./ImagePreview";
import Options from "./Options";

interface Props {
  open: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  create: (product: Iproduct) => void;
  currProduct: Iproduct;
  handleCurrProduct: (key: string, value: string | boolean | number) => void;
}

export default function ProductForm({
  open,
  onClose,
  setOpen,
  create,
  currProduct,
  handleCurrProduct,
}: Props) {
  const [fileName, setFileName] = useState<string | undefined>("");

  // 체크박스에 대한 이벤트입니다.
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCurrProduct(event.target.name, event.target.checked);
  };

  // 체크박스가 아닌 기본적인 textbox의 이벤트입니다.
  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    let value: string | number = event.target.value;

    if (name === "price" || name === "category_id") {
      value = Number(value);
    }

    handleCurrProduct(name, value);
  };

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    price: "",
  });

  // currProduct가 바뀔때마다 이를 읽어서 에러를 띄워줍니다.
  useEffect(() => {
    if (!currProduct.name) {
      setErrors((err) => ({ ...err, name: "상품명을 입력하세요." }));
    } else {
      setErrors((err) => ({ ...err, name: "" }));
    }

    if (!currProduct.image) {
      setErrors((err) => ({
        ...err,
        image: "상품 이미지 파일을 업로드하세요.",
      }));
    } else {
      setErrors((err) => ({ ...err, image: "" }));
    }

    if (!currProduct.price) {
      setErrors((err) => ({
        ...err,
        price: "가격을 입력해주세요.",
      }));
    } else {
      setErrors((err) => ({ ...err, price: "" }));
    }
  }, [currProduct]);

  const isFormValid = () =>
    !Object.values(errors).some((error) => error !== "");

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

    if (currProduct.image && currProduct.thumbnail) {
      const imageBlob = dataURLToBlob(currProduct.image);
      const thumbBlob = dataURLToBlob(currProduct.thumbnail);

      formData.append("image", imageBlob, fileName);
      formData.append("thumb", thumbBlob, `th${fileName}`);

      axios
        .post(`${REST_API}api/file/thumb/test`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          handleCurrProduct("image", resp.data.file.url);
          handleCurrProduct("thumbnail", resp.data.file.thumb);

          create(currProduct);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box width="600px">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              backgroundColor: "#282c34",
              alignItems: "center",
              height: "60px",
            }}
          >
            <DialogTitle
              sx={{
                padding: "0px 0px 0px 20px",
                fontSize: "24px",
                fontWeight: 500,
                color: "white",
              }}
            >
              상품 등록
            </DialogTitle>
          </Box>
          <DialogContent>
            <Grid container xs={12} spacing={2}>
              <Grid
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <DialogContentText>상품 이미지</DialogContentText>
                <ImagePreview
                  error={Boolean(errors.image)}
                  helperText={errors.image}
                  handleCurrProduct={handleCurrProduct}
                  fileName={fileName}
                  setFileName={setFileName}
                  thumbnail={currProduct.thumbnail}
                />
              </Grid>
              <Grid xs={12}>
                <DialogContentText>상품명</DialogContentText>
                <TextField
                  id="name"
                  name="name"
                  value={currProduct.name}
                  fullWidth
                  variant="outlined"
                  onChange={handleProductChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid xs={6}>
                <DialogContentText>가격</DialogContentText>
                <FormControl fullWidth variant="outlined">
                  <Input
                    id="standard-adornment-amount"
                    name="price"
                    value={currProduct.price}
                    onChange={handleProductChange}
                    error={Boolean(errors.price)}
                    startAdornment={
                      <InputAdornment position="start">￦</InputAdornment>
                    }
                  />
                  {errors.price && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.price}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={3}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="represent"
                        value={currProduct.signature}
                        onChange={handleCheckChange}
                      />
                    }
                    label="대표"
                  />
                </FormGroup>
              </Grid>
              <Grid xs={3}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="popular"
                        value={currProduct.popular}
                        onChange={handleCheckChange}
                      />
                    }
                    label="인기"
                  />
                </FormGroup>
              </Grid>
              <Grid xs={12}>
                <DialogContentText>세부 설명</DialogContentText>
                <TextField
                  id="outlined-multiline-static"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  value={currProduct.description}
                  onChange={handleProductChange}
                />
              </Grid>
              <Grid xs={12}>
                <DialogContentText>추가 옵션</DialogContentText>
                <Options></Options>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>닫기</Button>
            <Button
              disabled={!isFormValid()}
              onClick={() => {
                postImage();
                setOpen(false);
                setFileName("");
              }}
            >
              등록
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
