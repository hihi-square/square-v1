/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { REST_API } from "redux/redux";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Bootpay } from "@bootpay/client-js";

export default function Pay() {
  const navigate = useNavigate();
  const location = useLocation();

  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [points, setPoints] = useState(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const totalPoints = 10000; // 이 부분은 실제로 DB에서 가져오게 될 부분입니다.

  useEffect(() => {
    if (location.state && location.state.items) {
      setTotalPrice(
        location.state.items.reduce(
          (total: number, item: any) =>
            item.isChecked ? total + item.price * item.quantity : total,
          0
        )
      );
      setFinalPrice(totalPrice - points);
    }
  }, [points]);

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPoints = Number(e.target.value);

    if (newPoints > totalPoints) {
      newPoints = totalPoints;
    }
    if (newPoints > totalPrice) {
      newPoints = totalPrice;
    }
    setPoints(newPoints);
  };

  const goBack = () => {
    const previousState = location.state?.from;

    if (previousState) {
      navigate(previousState);
    } else {
      navigate(-1);
    }
  };

  const handlePayment = async () => {
    const finalItem = {
      id: "통합코드",
      name: "통합상품",
      qty: 1,
      price: -points,
    };

    const orderItem = {
      cusId: 23,
      stoId: 21,
      totalPrice: finalPrice,
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

    await axios({
      url: `${REST_API}order`,
      method: "POST",
      data: orderItem,
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log("받아온 데이터:", res.data);

        try {
          const response = Bootpay.requestPayment({
            application_id: "64cf839d00be04001c6993d3",
            price: finalPrice,
            order_name: location.state.storeName,
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
              open_type: "popup",
              card_quota: "0,2,3",
              escrow: false,
            },
          });

          // 이후 응답을 처리하는 로직(필요시)
          // eslint-disable-next-line no-console
          console.log(response);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ArrowBackIcon onClick={goBack} />

        <TextField
          label="전화번호"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="요청사항"
          variant="outlined"
          multiline
          rows={4}
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        />
        <TextField
          label="포인트 사용량"
          variant="outlined"
          type="number"
          value={points}
          onChange={handlePointChange}
        />
        <Typography variant="body2">
          보유 포인트: {totalPoints.toLocaleString()}원
        </Typography>

        <Typography variant="h6">
          주문금액: {totalPrice.toLocaleString()}원
        </Typography>
        <Typography variant="h6">
          포인트 차감: {points.toLocaleString()}원
        </Typography>
        <Typography variant="h6">-----------------</Typography>
        <Typography variant="h6">
          최종 결제금액: {finalPrice.toLocaleString()}원
        </Typography>

        <button onClick={handlePayment}>결제하기</button>
      </div>
    </>
  );
}
