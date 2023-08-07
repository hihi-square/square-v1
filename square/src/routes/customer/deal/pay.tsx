import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export type Item = {
  productThumbnail: string;
  productName: string;
  price: number;
  quantity: number;
  isSelected?: boolean;
};

export type Store = {
  shopThumbnail: string;
  shopName: string;
  estimatedTime: string;
  items: Item[];
};

type RootState = {
  cart: {
    selectedItems: Store[];
  };
};

function Pay() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedItems = useSelector(
    (state: RootState) => state.cart.selectedItems
  );

  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const [points, setPoints] = useState(0);
  const totalPoints = 10000; // 이 부분은 실제로 DB에서 가져오게 될 부분입니다.

  const totalAmount = selectedItems.reduce((acc, store) => {
    const storeTotal = store.items.reduce(
      (storeAcc, item) => storeAcc + item.price * item.quantity,
      0
    );

    return acc + storeTotal;
  }, 0);

  const finalAmount = totalAmount - points;

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPoints = Number(e.target.value);

    if (newPoints > totalPoints) {
      newPoints = totalPoints;
    }
    if (newPoints > totalAmount) {
      newPoints = totalAmount;
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

  return (
    <>
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
        주문금액: {totalAmount.toLocaleString()}원
      </Typography>
      <Typography variant="h6">
        포인트 차감: {points.toLocaleString()}원
      </Typography>
      <Typography variant="h6">-----------------</Typography>
      <Typography variant="h6">
        최종 결제금액: {finalAmount.toLocaleString()}원
      </Typography>

      <button>주문 완료</button>
    </>
  );
}

export default Pay;
