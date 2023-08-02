// =======================================IMPORT 구문========================================== //
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import {
  Unstable_Grid2 as Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Pagination,
} from "@mui/material";
import { Iproduct, Icategory, Itype } from "types";

import ProductForm from "./ProductForm";
import "../Seller.css";
// ============================================================================================ //
export default function Product() {
  const initState: Iproduct = {
    id: 0,
    image: "",
    thumbnail: "",
    category_id: 1,
    category: "",
    type_id: 1,
    type: "",
    name: "",
    represent: false,
    popular: false,
    price: 0,
    status_code: 1,
    status: "판매중",
    create_at: "",
    modified_at: "",
    sal_record: 0,
    description: "",
  };

  const [products, setProducts] = useState<Iproduct[]>([
    initState,
    ...JSON.parse(localStorage.getItem("products") || "[]"),
  ]); // 제품 목록
  const [categorys] = useState<Icategory[]>(
    JSON.parse(localStorage.getItem("categorys") || "[]")
  ); // 카테고리 목록
  const types = useSelector((state: RootState) => state.types as Itype[]); // 소분류 목록
  const [page, setPage] = useState<number>(1); // 페이지네이션 페이지
  const [open, setOpen] = useState<boolean>(false); // 모달 표시 여부
  const [create, setCreate] = useState<boolean>(false); // 모달 타입(등록 / 수정)
  const [modalId, setModalId] = useState<number[]>([0, 0]); // 모달 상품 번호
  const [createItem, setCreateItem] = useState<boolean>(false); // 아이템 업로드
  const [currProduct, setCurrProduct] = useState<Iproduct>(initState);

  const itemsPerPage = 10; // 페이지네이션 기준
  const currentProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  ); // 페이지 표시 상품

  const handleCurrProduct = (key: string, value: string | boolean | number) => {
    setCurrProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = () => {
    setCreate((prev) => !prev);
  };

  const createProduct = (product: Iproduct, length: number) => {
    if (product.id === 0) {
      product.id = length;
      setProducts((prev) => [...prev, product]);
    } else {
      setProducts((prev) => {
        const index = prev.findIndex((p) => p.id === product.id);

        if (index !== -1) {
          const newProducts = [...prev];

          newProducts[index] = product;
          return newProducts;
        }

        return prev;
      });
    }
    setCreateItem(true);
  };

  useEffect(() => {
    if (createItem)
      localStorage.setItem("products", JSON.stringify(products.slice(1)));
    setCreateItem(false);
  }, [createItem, products]);

  useEffect(() => {
    if (modalId[1] !== 0) setOpen(true);
  }, [modalId]);

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
      <Grid xs={12} sx={{ height: "80%", paddingBottom: "10px" }}>
        <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
          <TableContainer>
            <Table
              sx={{ tableLayout: "fixed", minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    섬네일
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    카테고리
                  </TableCell>
                  <TableCell align="center" sx={{ width: "30%" }}>
                    상품명
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    대표
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    인기
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    가격(원)
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    판매량
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    상태
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProducts.map((product) =>
                  product.id === 0 ? null : (
                    <TableRow
                      key={product.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        className="table-text"
                        sx={{ padding: "10px", width: "10%" }}
                      >
                        <img src={product.thumbnail} alt="thumbnail" />
                      </TableCell>
                      <TableCell
                        className="table-text"
                        align="center"
                        sx={{ padding: "10px", width: "10%" }}
                      >
                        {product.category}
                      </TableCell>
                      <TableCell
                        className="table-text"
                        align="center"
                        sx={{ padding: "0px", width: "20%" }}
                      >
                        {product.name}
                      </TableCell>
                      <TableCell
                        className="table-text"
                        align="center"
                        sx={{ padding: "0px", width: "5%" }}
                      >
                        {product.represent ? "O" : "X"}
                      </TableCell>
                      <TableCell
                        className="table-text"
                        align="center"
                        sx={{ padding: "0px", width: "5%" }}
                      >
                        {product.popular ? "O" : "X"}
                      </TableCell>
                      <TableCell
                        className="table-text"
                        align="center"
                        sx={{ padding: "0px", width: "10%" }}
                      >
                        {product.price}
                      </TableCell>
                      <TableCell
                        className="table-text"
                        align="center"
                        sx={{ padding: "0px", width: "15%" }}
                      >
                        {product.sal_record}
                      </TableCell>
                      <TableCell
                        className="table-text"
                        align="center"
                        sx={{ padding: "0px", width: "15%" }}
                      >
                        {product.status}
                      </TableCell>
                      <TableCell
                        className="table-text"
                        align="center"
                        sx={{ padding: "0px", width: "10%" }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            setCreate(false);
                            setCurrProduct(products[product.id]);
                            setModalId((prev) => [
                              (prev[0] + 1) % 2,
                              product.id,
                            ]);
                          }}
                        >
                          추가
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setCreate(true);
              setCurrProduct(initState);
              setOpen(true);
            }}
          >
            상품등록
          </Button>
          <ProductForm
            open={open}
            close={setOpen}
            categorys={categorys}
            types={types}
            length={products.length}
            create={createProduct}
            isCreateModal={create}
            handleCreateModal={handleCreate}
            currProduct={currProduct === undefined ? initState : currProduct}
            handleCurrProduct={handleCurrProduct}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
