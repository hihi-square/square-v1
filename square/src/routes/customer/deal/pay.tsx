import React from "react";
import { Bootpay } from "@bootpay/client-js";

export default function Pay() {
  const handlePayment = async () => {
    try {
      const response = await Bootpay.requestPayment({
        application_id: "64cf839d00be04001c6993d3",
        price: 100,
        order_name: "상품명",
        order_id: "TEST_ORDER_ID",
        user: {
          id: "회원아이디",
          username: "회원이름",
          phone: "01000000000",
          email: "test@test.com",
        },
        items: [
          {
            id: "item_id",
            name: "테스트아이템",
            qty: 1,
            price: 100,
          },
        ],
        extra: {
          open_type: "iframe",
          card_quota: "0,2,3",
          escrow: false,
        },
      });

      // 이후 응답을 처리하는 로직(필요시)
      // eslint-disable-next-line no-console
      console.log(response);
    } catch (error) {}
  };

  return (
    <>
      <button onClick={handlePayment}>결제하기</button>
    </>
  );
}
