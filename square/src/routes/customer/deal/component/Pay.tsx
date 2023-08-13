/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Unstable_Grid2 as Grid,
  Button,
  Checkbox,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Bootpay } from "@bootpay/client-js";
import Header from "./Header";

export default function Pay() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");

  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("정성스럽게 준비해주세요.");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [myPoints, setMyPoints] = useState<number>(0);
  const [check, setChecked] = useState<boolean>(false);

  // 처음에 실제 가격과, 유저의 포인트를 가져옵니다.
  useEffect(() => {
    if (location.state && location.state.items) {
      const tmp = location.state.items.reduce(
        (total: number, item: any) =>
          item.isChecked ? total + item.price * item.quantity : total,
        0
      );

      setTotalPrice(tmp);
    } else {
      navigate("/main");
    }

    axios({
      url: `${REST_API}user`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setMyPoints(response.data.point);
        setPhone(response.data.info.phone);
      })
      .catch((error) => {
        console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  }, []);

  useEffect(() => {
    setFinalPrice(totalPrice - points);
  }, [points, totalPrice]);

  // 포인트가 0 이하거나 최대치를 넘어설때
  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPoints = Number(e.target.value);

    if (newPoints < 0) {
      newPoints = 0;
    }
    if (newPoints > myPoints) {
      newPoints = myPoints;
    }
    if (newPoints > totalPrice) {
      newPoints = totalPrice;
    }
    setPoints(newPoints);
  };

  const handleCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      let newPoints = myPoints;

      if (newPoints > totalPrice) {
        newPoints = totalPrice;
      }
      setPoints(newPoints);
    }
    setChecked(!check);
  };

  const handlePayment = async () => {
    const finalItem = {
      id: "통합코드",
      name: "통합상품",
      qty: 1,
      price: -points,
    };

    const orderItem = {
      cusId: userId,
      stoId: location.state.storeId,
      totalPrice,
      menuList: [] as any[],
      request,
      usedPoint: points,
    };

    for (const item of location.state.items) {
      if (item.isChecked) {
        const tmp = {
          productId: item.productId,
          type: "ME01",
          quantity: item.quantity,
          price: item.price,
        };

        orderItem.menuList.push(tmp);

        finalItem.price += item.price * item.quantity;
      }
    }
    let ordId = 0;

    await axios({
      url: `${REST_API}order`,
      method: "POST",
      data: orderItem,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log("받아온 데이터:");
        console.log(res.data);

        ordId = res.data.ordId;
        console.log(ordId);

        Bootpay.requestPayment({
          application_id: "64cf839d00be04001c6993d3",
          price: finalPrice,
          order_name: "SQUARE 주문서",
          order_id: `${location.state.storeName}CODE${Math.floor(
            Math.random() * 10000000
          )}`,
          user: {
            id: "회원아이디",
            username: "회원이름",
            phone,
          },
          items: [finalItem],

          extra: {
            open_type: "iframe",
            display_error_result: true,
            card_quota: "0,2,3",
            escrow: false,
          },
        })
          .then((resp) => {
            axios({
              url: `${REST_API}order/customer-pay`,
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                ordId: Number(ordId),
                paymentSuccess: true,
                paymentMethod: resp.data.method,
              },
            })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
            axios({
              url: `${REST_API}order/customer-pay`,
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                ordId,
                paymentSuccess: false,
              },
            })
              .then((response) => {
                console.log(response.data);
              })
              .catch((eror) => {
                console.log(eror);
              });
          });
      })
      .catch((err) => {
        navigate(-1);
      });
  };

  return (
    <Grid container xs={12} justifyContent="center">
      <Header page="결제" />
      <Grid xs={12} sx={{ height: "70px" }}></Grid>
      <Grid container xs={11} flexDirection="column" alignItems="center">
        <Grid
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 700,
              color: "black",
              textAlign: "left",
              padding: "10px 0px 4px 20px",
              width: "90%",
              whiteSpace: "pre-line",
            }}
          >
            연락처
          </Typography>
          <TextField
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ width: "90%" }}
          />
          <Typography
            variant="body2"
            component="div"
            sx={{
              fontWeight: 700,
              color: "grey",
              textAlign: "left",
              padding: "1px 0px 4px 20px",
              width: "90%",
              whiteSpace: "pre-line",
            }}
          >
            설정된 번호 외의 연락 수단이 있을 경우 기재 가능
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Divider sx={{ margin: "10px 0px" }}></Divider>
        </Grid>
        <Grid
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 700,
              color: "black",
              textAlign: "left",
              padding: "10px 0px 4px 20px",
              width: "90%",
              whiteSpace: "pre-line",
            }}
          >
            요청사항
          </Typography>
          <TextField
            variant="outlined"
            multiline
            rows={4}
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            sx={{ width: "90%" }}
          />
        </Grid>
        <Grid xs={12}>
          <Divider sx={{ margin: "10px 0px" }}></Divider>
        </Grid>
        <Grid
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              textAlign: "left",
              width: "90%",
              margin: "10px 0px 0px 5px",
              whiteSpace: "pre-line",
            }}
          >
            주문 금액 : {totalPrice}원
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 700,
              color: "black",
              textAlign: "left",
              padding: "10px 0px 4px 20px",
              width: "90%",
              whiteSpace: "pre-line",
            }}
          >
            포인트 사용
          </Typography>
          <TextField
            variant="outlined"
            type="number"
            value={points}
            onChange={handlePointChange}
            sx={{ width: "90%" }}
          />
          <Grid container justifyContent="space-between" sx={{ width: "100%" }}>
            <Grid
              xs={7}
              sx={{
                marginTop: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: "gray",
                  textAlign: "left",
                  padding: "3px 0px 4px 20px",
                  width: "90%",
                }}
              >
                보유 포인트 : {myPoints} 원
              </Typography>
            </Grid>
            <Grid
              xs={5}
              sx={{
                marginTop: "5px",
                marginRight: "30px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                color="primary"
                checked={check}
                size="small"
                onChange={(e) => handleCheckboxChange(e.target.checked)}
              />
              <Typography
                variant="body2"
                component="div"
                sx={{
                  fontWeight: 400,
                  color: "black",
                  textAlign: "left",
                  width: "90%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                전체사용
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} sx={{ height: 80 }}></Grid>
        <Grid
          xs={10}
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "600px",
            height: 70,
          }}
        >
          <Button
            onClick={handlePayment}
            variant="contained"
            sx={{ width: "100%", height: "50px" }}
          >
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: 600,
                color: "white",
                textAlign: "center",
                width: "90%",
              }}
            >
              {finalPrice} 원 결제
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
