import { useState, useEffect } from "react";
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
import { Iproduct } from "types";
import axios from "axios";
import ProductForm from "./ProductForm";
import "../Seller.css";

export default function Product() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("./testdata/productSample.json").then((res) => {
      setProducts(res.data);
    });
  }, []);

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
                  <TableCell align="center" sx={{ width: "40%" }}>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
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
                      sx={{ padding: "0px", width: "30%" }}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={10} />
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleClickOpen();
            }}
          >
            추가
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleClickOpen();
            }}
          >
            카테고리 수정
          </Button>
          <ProductForm open={open} close={handleClose} />
        </Paper>
      </Grid>
    </Grid>
  );
}
