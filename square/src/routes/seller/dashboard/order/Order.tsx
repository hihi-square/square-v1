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
import {
  Unstable_Grid2 as Grid,
  Button,
  // Divider,
  Paper,
  Pagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import "../../Seller.css";

type OrderItem = {
  createdAt: number[];
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
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  const [pickList, setPickList] = useState<OrderItem[]>([]);
  const [acceptList, setAcceptList] = useState<OrderItem[]>([]);
  const [render, setRender] = useState<boolean>(true);
  const [tab, setTab] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>();
  const [nowYear, setNowYear] = useState<number>();
  const [chartType, setChartType] = useState<boolean>(true);

  const getOrderData = () => {
    axios({
      url: `${REST_API}order/store`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const datas = response.data.filter(
          (order: OrderItem) =>
            order.status !== "PAYMENT_FAILED" && order.status !== "REGISTERED"
        );

        const aList: OrderItem[] = [];
        const pList: OrderItem[] = [];

        for (const order of datas) {
          if (order.status === "PAYMENT_COMPLETE") {
            aList.push(order);
          } else if (order.status === "ORDER_ACCEPT") {
            pList.push(order);
          }
        }
        setOrderList(datas);
        setAcceptList(aList);
        setPickList(pList);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  };

  useEffect(() => {
    getOrderData();
  }, []);

  useEffect(() => {
    if (render) {
      getOrderData();
      setRender(false);
    }
  }, [render]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const yearlySummaryData = generateYearlySummary(orderList, currentYear);

    setNowYear(currentYear);
    setData(yearlySummaryData);
  }, [orderList]);

  const convertToDateArray = (dateArray: number[]) =>
    new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      dateArray[3],
      dateArray[4],
      dateArray[5]
    );

  const generateMonthlySummary = (
    orders: OrderItem[],
    year: number,
    month: number
  ) => {
    // 주어진 연도와 월에 맞는 주문만 필터링
    const filteredOrders = orders.filter(
      (order) => order.createdAt[0] === year && order.createdAt[1] === month
    );

    const totalOrders = filteredOrders.length;
    const totalPrice = filteredOrders.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    return { name: `${month}월`, 주문수: totalOrders, 총가격: totalPrice };
  };

  const generateYearlySummary = (orders: OrderItem[], year: number) => {
    const yearlySummary: { name: string; 주문수: number; 총가격: number }[] =
      [];

    // 1월부터 12월까지 각 월별 데이터 생성
    for (let month = 1; month <= 12; month++) {
      yearlySummary.push(generateMonthlySummary(orders, year, month));
    }

    return yearlySummary;
  };

  const acceptOrder = (ordId: number) => {
    axios({
      url: `${REST_API}order/store-acceptance/${ordId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setRender(true);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  };

  const deniedOrder = (ordId: number) => {
    axios({
      url: `${REST_API}order/store-denied/${ordId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setRender(true);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  };

  const pickupFinish = (ordId: number) => {
    axios({
      url: `${REST_API}order/store-pickup/${ordId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setRender(true);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  };

  return (
    <Grid container xs={12} flexDirection="column">
      <Grid xs={12} sx={{ marginTop: 3, marginLeft: 5, paddingBottom: "10px" }}>
        <Typography
          variant="h3"
          sx={{ marginBottom: 1, color: "#225a41", fontWeight: 700 }}
        >
          {" "}
          주문관리{" "}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "primary.main",
            flexGrow: 1,

            textAlign: "left",
            fontWeight: 400,
          }}
        >
          가게에 들어온 주문들을 관리하고 통계 정보를 볼 수 있습니다.
        </Typography>
      </Grid>
      <Grid xs={12} container>
        <Grid xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Paper
            elevation={3}
            sx={{
              width: "95%",
              height: "450px",
              margin: "10px",
              overflow: "hidden",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                position: "relative",
              }}
            >
              <Grid
                xs={12}
                container
                sx={{
                  justifyContent: "space-between",
                  margin: "10px 10px",
                  position: "absolute",
                  top: 0,
                }}
              >
                <Grid
                  xs={3}
                  onClick={() => {
                    setPage(1);
                    setTab(1);
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center", fontWeight: 700 }}
                  >
                    픽업 대기중
                  </Typography>
                </Grid>
                <Grid
                  xs={3}
                  onClick={() => {
                    setPage(1);
                    setTab(2);
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center", fontWeight: 700 }}
                  >
                    수락 대기중
                  </Typography>
                </Grid>
                <Grid
                  xs={3}
                  onClick={() => {
                    setPage(1);
                    setTab(3);
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center", fontWeight: 700 }}
                  >
                    전체 리스트
                  </Typography>
                </Grid>

                <Grid
                  container
                  xs={12}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Grid xs={3}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ textAlign: "center", fontWeight: 600 }}
                    >
                      주문 일시
                    </Typography>
                  </Grid>
                  <Grid xs={3}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ textAlign: "center", fontWeight: 600 }}
                    >
                      연락처
                    </Typography>
                  </Grid>
                  <Grid xs={3}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ textAlign: "center", fontWeight: 600 }}
                    >
                      총 가격
                    </Typography>
                  </Grid>

                  <Grid xs={3}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ textAlign: "center", fontWeight: 600 }}
                    >
                      상태
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {tab === 1 && (
                <Grid
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {pickList?.slice((page - 1) * 10, page * 10).map((order) => (
                    <Grid container xs={12} key={`a${order.ordId}`}>
                      <Grid xs={3}>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ textAlign: "center", fontWeight: 400 }}
                        >
                          {order.createdAt &&
                            convertToDateArray(
                              order.createdAt
                            ).toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid xs={3}>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ textAlign: "center", fontWeight: 400 }}
                        >
                          {order.storePhone}
                        </Typography>
                      </Grid>
                      <Grid xs={3}>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ textAlign: "center", fontWeight: 400 }}
                        >
                          {order.totalPrice}
                        </Typography>
                      </Grid>
                      <Grid
                        xs={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => {
                            pickupFinish(order.ordId);
                          }}
                        >
                          픽업 완료
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                  <Pagination
                    count={Math.ceil(pickList.length / 10)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              )}
              {tab === 2 && (
                <>
                  {acceptList
                    ?.slice((page - 1) * 10, page * 10)
                    .map((order) => (
                      <Grid container xs={12} key={`b${order.ordId}`}>
                        <Grid xs={3}>
                          <Typography
                            variant="h6"
                            component="h6"
                            sx={{ textAlign: "center", fontWeight: 400 }}
                          >
                            {order.createdAt &&
                              convertToDateArray(
                                order.createdAt
                              ).toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid xs={3}>
                          <Typography
                            variant="h6"
                            component="h6"
                            sx={{ textAlign: "center", fontWeight: 400 }}
                          >
                            {order.storePhone}
                          </Typography>
                        </Grid>
                        <Grid xs={3}>
                          <Typography
                            variant="h6"
                            component="h6"
                            sx={{ textAlign: "center", fontWeight: 400 }}
                          >
                            {order.totalPrice}
                          </Typography>
                        </Grid>
                        <Grid
                          xs={3}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => {
                              acceptOrder(order.ordId);
                            }}
                          >
                            주문 수락
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              deniedOrder(order.ordId);
                            }}
                          >
                            주문 거절
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  <Pagination
                    count={Math.ceil(acceptList.length / 10)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                  />
                </>
              )}
              {tab === 3 && (
                <>
                  {orderList?.slice((page - 1) * 10, page * 10).map((order) => (
                    <Grid container xs={12} key={`c${order.ordId}`}>
                      <Grid xs={3}>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ textAlign: "center", fontWeight: 400 }}
                        >
                          {order.createdAt &&
                            convertToDateArray(
                              order.createdAt
                            ).toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid xs={3}>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ textAlign: "center", fontWeight: 400 }}
                        >
                          {order.storePhone}
                        </Typography>
                      </Grid>
                      <Grid xs={3}>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ textAlign: "center", fontWeight: 400 }}
                        >
                          {order.totalPrice}
                        </Typography>
                      </Grid>
                      <Grid
                        xs={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {order.status}
                      </Grid>
                    </Grid>
                  ))}
                  <Pagination
                    count={Math.ceil(orderList.length / 10)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                  />
                </>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid xs={12} sx={{ paddingBottom: "10px" }}>
          <Paper
            elevation={1}
            sx={{
              width: "95%",
              height: "400px",
              margin: "10px",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ textAlign: "left", fontWeight: 700 }}
            >
              {nowYear}년 {chartType ? "주문수" : "총가격"} 그래프
              {chartType ? (
                <Button
                  onClick={() => {
                    setChartType(false);
                  }}
                >
                  총가격
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setChartType(true);
                  }}
                >
                  주문수
                </Button>
              )}
            </Typography>
            <BarChart width={900} height={400} data={data}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartType ? (
                <Bar dataKey="주문수" fill="#8884d8" />
              ) : (
                <Bar dataKey="총가격" fill="#82ca9d" />
              )}
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
