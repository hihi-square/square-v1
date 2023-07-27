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
import "../Seller.css";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif",
  },
});

function getProduct(list) {
  if(list){
    return list.map((product,i)=>(
      <div key={i}> {`${product.name  }(${  product.quantity  })`}</div>
      ))
  }
  else return null;
};

export default function Order(props) {

  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get("./saleSample.json")
    .then((res)=>{setSales(res.data)});
  }, []);
  
	return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{height:"100%", display: 'flex', flexDirection: 'column'}}>
      <Grid xs={12} sx={{paddingBottom: "10px"}}> 
        <Typography variant="h4" component="div" sx={{flexGrow: 1, textAlign: "left", fontWeight: 800}}>세일 관리</Typography>
        <Typography component="div" sx={{flexGrow: 1, textAlign: "left", fontWeight: 500}}>가게에 등록할 세일을 관리합니다.</Typography>
      </Grid>
			<Grid xs={12} sx={{flexGrow: 1, height: "80%", paddingBottom: "10px"}}>
        <Paper elevation={1} className="full-compo" sx={{margin: "10px"}}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">섬네일</TableCell>
                <TableCell align="center">세일명</TableCell>
                <TableCell align="center">시작일</TableCell>
                <TableCell align="center">종료일</TableCell>
                <TableCell align="center">가격(원)</TableCell>
                <TableCell align="center">할인율</TableCell>
                <TableCell align="center">구성상품</TableCell>
                <TableCell align="center">상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow
                  key={sale.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {sale.thumbnail}
                  </TableCell>
                  <TableCell align="center">{sale.name}</TableCell>
                  <TableCell align="center">{sale.started_at}</TableCell>
                  <TableCell align="center">{sale.finished_at}</TableCell>
                  <TableCell align="center">{sale.price}원</TableCell>
                  <TableCell align="center">1000</TableCell>
                  <TableCell align="center">{getProduct(sale.menu)}</TableCell>
                  <TableCell align="center">{sale.status}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={10} />
        <Button variant="contained" color="success">
          추가
        </Button>
        <Button variant="contained" color="success">
          카테고리 수정
        </Button>
        </Paper>
      </Grid>
      </Grid>
    </ThemeProvider>
	);
}