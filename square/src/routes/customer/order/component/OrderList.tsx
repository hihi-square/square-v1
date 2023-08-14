import { useState } from "react";
import { Box, Typography, Grid, Collapse, IconButton } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Order() {
  const [openProductIndex, setOpenProductIndex] = useState<number | null>(null);
  const [openPaymentIndex, setOpenPaymentIndex] = useState<number | null>(null);

  const dummyData = [
    {
      orderNo: "20230801-01",
      orderTime: "2023년 08월 01일 14:30:55",
      status: "픽업완료",
      products: [
        { thumbnail: "이미지URL1", name: "상품1", price: 10000, count: 2 },
      ],
      total: 20000,
      discount: 2000,
      finalPrice: 18000,
    },
    {
      orderNo: "20230802-01",
      orderTime: "2023년 08월 02일 15:35:25",
      status: "주문 취소",
      products: [
        { thumbnail: "이미지URL2", name: "상품2", price: 12000, count: 1 },
        { thumbnail: "이미지URL3", name: "상품3", price: 8000, count: 1 },
      ],
      total: 20000,
      discount: 0,
      finalPrice: 20000,
    },
    {
      orderNo: "20230801-01",
      orderTime: "2023년 08월 01일 14:30:55",
      status: "픽업완료",
      products: [
        { thumbnail: "이미지URL1", name: "상품1", price: 10000, count: 2 },
      ],
      total: 20000,
      discount: 2000,
      finalPrice: 18000,
    },
    {
      orderNo: "20230802-01",
      orderTime: "2023년 08월 02일 15:35:25",
      status: "픽업완료",
      products: [
        { thumbnail: "이미지URL2", name: "상품2", price: 12000, count: 1 },
        { thumbnail: "이미지URL3", name: "상품3", price: 8000, count: 1 },
      ],
      total: 20000,
      discount: 0,
      finalPrice: 20000,
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {dummyData.map((order, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                padding: "1rem",
              }}
            >
              <Box>
                <Typography variant="h6">{order.orderNo}</Typography>
                <Typography variant="subtitle1">{order.orderTime}</Typography>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: order.status === "픽업완료" ? "green" : "red",
                }}
              >
                {order.status}
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
                {order.products.map((product, pIndex) => (
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
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      width="20"
                      height="20"
                    />
                    <Typography>{product.name}</Typography>
                    <Typography>{product.count * product.price}원 </Typography>
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
                  <Typography>총액: {order.total}원</Typography>
                  <Typography>할인: {order.discount}원</Typography>
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
