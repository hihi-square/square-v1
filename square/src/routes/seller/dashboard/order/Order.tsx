/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Unstable_Grid2 as Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import "../../Seller.css";

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

type OrderItem = {
  ordId: number;
  status: string;
  storePhone: string;
  totalPrice: number;
  usedPoint: number;
  menu: {
    menuName: string;
    type: string;
    quantity: number;
    price: number;
  }[];
};

export default function Order() {
  const token = localStorage.getItem("accessToken");
  const userInfo = localStorage.getItem("userInfo");
  const userId = userInfo ? JSON.parse(userInfo).userId : 0;
  const [orderList, setOrderList] = useState<OrderItem[]>([]);

  useEffect(() => {
    axios({
      url: `${REST_API}order/store/${userId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setOrderList([...response.data]);
        console.log(orderList);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  }, []);

  return (
    <Grid container xs={12} flexDirection="column">
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
      <Grid xs={12} container>
        <Grid xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Paper
            elevation={3}
            sx={{
              width: "95%",
              height: "300px",
              margin: "10px",
              overflow: "hidden",
            }}
          >
            <Grid container sx={{ width: "100%" }}>
              <Grid container xs={12}>
                <Grid xs={3}>주문번호</Grid>
                <Grid xs={3}>연락처</Grid>
                <Grid xs={3}>총가격</Grid>
                <Grid xs={3}>상태</Grid>
              </Grid>
              {orderList?.map((order, index) => {
                if (order.status === "PAYMENT_COMPLETE") {
                  return (
                    <Grid container xs={12} key={`a${order.ordId}`}>
                      <Grid xs={3}>{index}</Grid>
                      <Grid xs={3}>{order.storePhone}</Grid>
                      <Grid xs={3}>{order.totalPrice}</Grid>
                      <Grid xs={3}>tnfkr 대기중</Grid>
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={6} container>
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
      </Grid>
    </Grid>
  );
}
