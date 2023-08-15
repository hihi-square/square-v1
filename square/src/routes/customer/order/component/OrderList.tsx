import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  Collapse,
  IconButton,
} from "@mui/material";
import { REST_API } from "redux/redux";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type OrderList = {
  ordId: number;
  stoId: number;
  createdAt: number[];
  finalPrice: number;
  menuList: {
    menuName: string;
    price: number;
    productId: number;
    quantity: number;
    type: string;
  }[];
  status: string;
  storeName: string;
  storePhone: string;
  totalPrice: number;
  usedPoint: number;
};

export default function Order() {
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState<OrderList[]>();
  const [openProductIndex, setOpenProductIndex] = useState<number | null>(null);
  const [openPaymentIndex, setOpenPaymentIndex] = useState<number | null>(null);

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 본인의 주문 정보를 가져옵니다.
  const getMyOrders = () => {
    axios({
      url: `${REST_API}order/customer`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const array: OrderList[] = [...response.data];

        setOrderList(array);
      })
      .catch((error) => {
        navigate("/error", { state: error });
      });
  };

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 로딩화면 및 출력 및 토큰 검사 후, axios 통신
  useEffect(() => {
    getMyOrders();
  }, []);

  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const convertToDateArray = (dateArray: number[]) =>
    new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      dateArray[3],
      dateArray[4],
      dateArray[5]
    );

  const convertStatus = (stat: string): string[] => {
    console.log(stat);
    switch (stat) {
      case "PAYMENT_COMPLETE":
        return ["수락 대기중", "grey"];

      case "PAYMENT_FAILED":
        return ["결제 실패", "red"];

      case "ORDER_ACCEPT":
        return ["주문 수락", "blue"];

      case "ORDER_REJECT":
        return ["주문 거절", "red"];

      case "PICKUP_COMPLETE":
        return ["픽업 완료", "primary"];
      default:
        return ["관리자 처리중", "black"];
    }
  };

  return (
    <>
      <Grid xs={11} container spacing={3}>
        {orderList &&
          orderList.map((order, index) => (
            <Grid xs={12} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  padding: "1rem",
                }}
              >
                <Box>
                  <Typography variant="h6">{`SQUA${order.ordId}`}</Typography>
                  <Typography variant="subtitle1">
                    {convertToDateArray(order.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: convertStatus(order.status)[1],
                  }}
                >
                  {convertStatus(order.status)[0]}
                </Typography>
              </Box>
              <Box sx={{ padding: "1rem" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>주문 상품</Typography>
                  <IconButton
                    onClick={() =>
                      setOpenProductIndex(
                        openProductIndex === index ? null : index
                      )
                    }
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>
                <Collapse
                  in={openProductIndex === index}
                  style={{ maxHeight: "40px", overflow: "auto" }}
                >
                  {order.menuList &&
                    order.menuList.map((product, pIndex) => (
                      <Box
                        key={pIndex}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "15px",
                          fontSize: "0.8rem",
                        }}
                      >
                        <Typography>{product.menuName}</Typography>
                        <Typography>총 {product.quantity} 개</Typography>
                        <Typography>
                          총 {product.price * product.quantity}원{" "}
                        </Typography>
                      </Box>
                    ))}
                </Collapse>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  <Typography>결제 내역</Typography>
                  <IconButton
                    onClick={() =>
                      setOpenPaymentIndex(
                        openPaymentIndex === index ? null : index
                      )
                    }
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>
                <Collapse
                  in={openPaymentIndex === index}
                  style={{ maxHeight: "15px", overflow: "auto" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "15px",
                      fontSize: "0.8rem",
                    }}
                  >
                    <Typography>총액: {order.totalPrice}원</Typography>
                    <Typography>할인: {order.usedPoint}원</Typography>
                    <Typography>결제액: {order.finalPrice}원</Typography>
                  </Box>
                </Collapse>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
