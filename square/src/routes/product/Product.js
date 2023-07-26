import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ProductForm from "./ProductForm.js";
import "../Seller.css";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif", // 원하는 폰트를 지정합니다.
  },
});


export default function Product(props) {

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("./productSample.json")
    .then((res)=>{setProducts(res.data)});
  }, []);
  
	return (
    <Grid xs={12} sx={{paddingBottom: "10px"}}> 
      <ThemeProvider theme={theme}>
        <Typography variant="h4" component="div" sx={{flexGrow: 1, textAlign: "left", fontWeight: 800}}>상품 관리</Typography>
        <Typography component="div" sx={{flexGrow: 1, textAlign: "left", fontWeight: 500}}>가게에 등록할 상품을 관리합니다.</Typography>
      </ThemeProvider>
			<Grid xs={12} sx={{height: "80%", paddingBottom: "10px"}}>
        <Paper elevation={1} className="full-compo" sx={{margin: "10px"}}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">섬네일</TableCell>
                <TableCell align="center">카테고리</TableCell>
                <TableCell align="center">상품명</TableCell>
                <TableCell align="center">대표</TableCell>
                <TableCell align="center">인기</TableCell>
                <TableCell align="center">노출</TableCell>
                <TableCell align="center">이벤트</TableCell>
                <TableCell align="center">가격(원)</TableCell>
                <TableCell align="center">상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.thumbnail}
                  </TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.represent?"O":"X"}</TableCell>
                  <TableCell align="center">{product.popular?"O":"X"}</TableCell>
                  <TableCell align="center">{product.visible?"O":"X"}</TableCell>
                    <TableCell align="center">
                    {
                      (product.timesale === 0 && product.linksale === 0) 
                        ? "-"
                        : (
                            <>
                              <div>타임세일: {product.timesale}개</div>
                              <div>연계세일: {product.linksale}개</div>
                            </>
                          )
                    }
                    </TableCell>
                  <TableCell align="center">{product.price}원</TableCell>
                  <TableCell align="center">{product.status}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={10} />
        <Button variant="contained" color="success" onClick={()=>{handleClickOpen()}}>
          추가
        </Button>
        <Button variant="contained" color="success" onClick={()=>{handleClickOpen()}}>
          카테고리 수정
        </Button>
        <ProductForm open={open} close={handleClose}/>
        </Paper>
      </Grid>
    </Grid>
	);
}
