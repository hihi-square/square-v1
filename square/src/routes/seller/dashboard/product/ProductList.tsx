/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
// =======================================IMPORT 구문========================================== //
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Unstable_Grid2 as Grid,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { Iproduct, Icategory } from "modules/types";
import { REST_API } from "redux/redux";
import ProductForm from "./ProductForm";

import DragDrop from "./components/DragDrop";

import "../../Seller.css";
// ============================================================================================ //
export default function ProductList() {
  // 초기값 설정
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo).userId : 0;

  const initProduct: Iproduct = {
    id: 0,
    userId: user,
    image: "",
    thumbnail: "",
    categoryId: 1,
    categoryName: "",
    name: "",
    signature: false,
    popular: false,
    price: 0,
    status: "STOP",
    createdAt: "",
    modifiedAt: "",
    salRecord: 0,
    description: "",
    sequence: 1,
  };
  const realProduct = useRef({ ...initProduct });
  const [open, setOpen] = useState<boolean>(false); // 모달 표시 여부
  const [reload, setReload] = useState<boolean>(true); // 아이템 업로드
  const [currProduct, setCurrProduct] = useState<Iproduct>(initProduct); // 최초 상품 설정
  const [products, setProducts] = useState<Iproduct[]>([]); // 상품목록
  const [categorys, setCategorys] = useState<Icategory[]>([]); // 카테고리목록
  const [click, setClick] = useState<number>(-1); // 클릭상품
  const [newCategory, setNewCategory] = useState<string>(""); // 클릭카테고리

  // 첫 실행 때 데이터를 상품과 카테고리 목록을 가져옵니다.
  useEffect(() => {
    if (reload) {
      axios({
        url: `${REST_API}store/menuitem`,
        method: "GET",
        headers: {
          storeId: user,
        },
      })
        .then((res) => {
          axios({
            url: `${REST_API}store/menucategory`,
            method: "GET",
            headers: {
              storeId: user,
            },
          })
            .then((res2) => {
              const arr: Icategory[] = res2.data.data;

              setCategorys(arr);
            })
            .catch(() => {
              navigate("/error");
            });

          const arr: Iproduct[] = res.data.data;

          setProducts(arr);
        })
        .catch(() => {
          navigate("/error");
        });

      setReload(false);
    }
  }, [reload]);

  // 현재 다루는 상품에서 해당하는 키값을 바꿉니다.
  const handleCurrProduct = (key: string, value: string | boolean | number) => {
    realProduct.current = { ...realProduct.current, [key]: value };

    setCurrProduct((prev) => ({ ...prev, [key]: value }));
  };

  // 상품을 만듭니다.
  const createProduct = (product: Iproduct) => {
    if (realProduct.current.id === 0) {
      axios({
        url: `${REST_API}store/menuitem`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...realProduct.current,
        },
      })
        .then(() => {
          // 상품 데이터를 보내고 응답이 왔다면 다시 렌더링합니다.
          console.log("생성");
          setCurrProduct({ ...initProduct });
          realProduct.current = { ...initProduct };
          setReload(true);
        })
        .catch((error) => {
          navigate("/error");
        });
    } else {
      axios({
        url: `${REST_API}store/menuitem/${realProduct.current.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...realProduct.current,
        },
      })
        .then(() => {
          // 상품 데이터를 보내고 응답이 왔다면 다시 렌더링합니다.
          console.log("수정");
          setCurrProduct({ ...initProduct });
          realProduct.current = { ...initProduct };
          setReload(true);
        })
        .catch((error) => {
          navigate("/error");
        });
    }
  };

  const deleteProduct = () => {
    axios({
      url: `${REST_API}store/menuitem/${realProduct.current.id}`,
      method: "DELETE",
    })
      .then(() => {
        // 상품 데이터를 보내고 응답이 왔다면 다시 렌더링합니다.
        console.log("삭제");
        setCurrProduct({ ...initProduct });
        realProduct.current = { ...initProduct };
        setReload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const close = () => {
    setCurrProduct({ ...initProduct });
    realProduct.current = { ...initProduct };
  };

  // 카테고리를 추가합니다.
  const handleCategory: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const now = event.target.value;

    setNewCategory(now);
  };

  const uploadCategory = () => {
    const length = categorys.length;
    const newCate = {
      name: newCategory,
      sequence: length + 1,
    };

    console.log(newCate);

    axios({
      url: `${REST_API}store/menucategory`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...newCate,
      },
    })
      .then((res) => {
        // 상품 데이터를 보내고 응답이 왔다면 다시 렌더링합니다.
        console.log(res);
        console.log("등록");
        setCurrProduct({ ...initProduct });
        realProduct.current = { ...initProduct };
        setReload(true);
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <Grid xs={12} sx={{ paddingBottom: "10px" }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, textAlign: "left", fontWeight: 800 }}
      >
        상품 관리
      </Typography>
      <Typography
        component="div"
        sx={{ flexGrow: 1, textAlign: "left", fontWeight: 500 }}
      >
        가게에 등록할 상품을 관리합니다.
      </Typography>
      <DragDrop
        realProduct={realProduct}
        setCurrProduct={setCurrProduct}
        products={products}
        categorys={categorys}
        setReload={setReload}
        click={click}
        setClick={setClick}
      ></DragDrop>
      {click === -1 ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            realProduct.current = { ...initProduct };
            setCurrProduct({ ...initProduct });
            setOpen(true);
          }}
        >
          상품등록
        </Button>
      ) : (
        <Grid>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setOpen(true);
            }}
          >
            상품수정
          </Button>
          <Button variant="contained" color="success" onClick={deleteProduct}>
            상품삭제
          </Button>
        </Grid>
      )}
      {}
      <Grid>
        <TextField
          id="name"
          name="name"
          value={newCategory}
          fullWidth
          variant="outlined"
          onChange={handleCategory}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            uploadCategory();
          }}
        >
          카테고리추가
        </Button>
      </Grid>
      <ProductForm
        open={open}
        onClose={close}
        setOpen={setOpen}
        create={createProduct}
        currProduct={currProduct}
        handleCurrProduct={handleCurrProduct}
      />
    </Grid>
  );
}
