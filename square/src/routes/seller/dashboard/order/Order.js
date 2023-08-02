import { useState, useEffect } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "../../Seller.css";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif",
  },
});

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Order(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("./orderSample.json").then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      setOrders(res.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Grid xs={12} sx={{ paddingBottom: "10px" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left", fontWeight: 800 }}
          >
            주문 관리
          </Typography>
          <Typography
            component="div"
            sx={{ flexGrow: 1, textAlign: "left", fontWeight: 500 }}
          >
            가게의 주문을 관리합니다.
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sx={{ flexGrow: 1, height: "40%", paddingBottom: "10px" }}
        >
          <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">고객명</TableCell>
                    <TableCell align="center">주문일시</TableCell>
                    <TableCell align="center">주문금액</TableCell>
                    <TableCell align="center">요청사항</TableCell>
                    <TableCell align="center">상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {order.uid}
                      </TableCell>
                      <TableCell align="center">{order.created_at}</TableCell>
                      <TableCell align="center">
                        {order.total_price}원
                      </TableCell>
                      <TableCell align="center">{order.requests}</TableCell>
                      <TableCell align="center">{order.status}</TableCell>
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
        <Grid
          xs={12}
          sx={{ flexGrow: 1, height: "40%", paddingBottom: "10px" }}
        >
          <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
