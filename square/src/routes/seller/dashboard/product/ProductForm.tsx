import React, { useState, useEffect } from "react";

import { Iproduct } from "modules/types";
import Grid from "@mui/material/Unstable_Grid2";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormHelperText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import ImagePreview from "./ImagePreview";

interface Props {
  open: boolean;
  close: (close: boolean) => void;

  length: number;
  create: (product: Iproduct, length: number) => void;
  isCreateModal: boolean;
  handleCreateModal: () => void;
  currProduct: Iproduct;
  handleCurrProduct: (key: string, value: string | boolean | number) => void;
}

export default function ProductForm({
  open,
  close,
  length,
  create,
  isCreateModal,
  handleCreateModal,
  currProduct,
  handleCurrProduct,
}: Props) {
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCurrProduct(event.target.name, event.target.checked);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    let value: string | number = event.target.value;

    if (name === "price" || name === "category_id" || name === "type_id") {
      value = Number(value);
    }

    handleCurrProduct(name, value);
  };

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });

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
    if (!currProduct.description) {
      setErrors((err) => ({ ...err, description: "상세 설명을 입력하세요." }));
    } else {
      setErrors((err) => ({ ...err, description: "" }));
    }
  }, [
    currProduct.name,
    currProduct.image,
    currProduct.price,
    currProduct.description,
  ]);

  const isFormValid = () =>
    !Object.values(errors).some((error) => error !== "");

  return (
    <>
      <Dialog open={open} onClose={close}>
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
            <Button onClick={() => handleCreateModal()}>수정</Button>
            <Grid container spacing={2}>
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
                  onChange={handleProductChange}
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
                  disabled={!isCreateModal}
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
                    disabled={!isCreateModal}
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
                        disabled={!isCreateModal}
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
                        disabled={!isCreateModal}
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
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                  disabled={!isCreateModal}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => close(false)}>닫기</Button>
            <Button
              disabled={!isFormValid() || !isCreateModal}
              onClick={() => {
                create(currProduct, length);
                close(false);
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
