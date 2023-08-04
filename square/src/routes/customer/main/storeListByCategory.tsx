import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Avatar } from "@mui/material";
import "../../../App.css";

export default function StoreListByCategory() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  type Store = {
    thumbnail: string;
    storeId: number;
    storeName: string;
    storeMenu: string;
    storeAddress: string;
  };

  // 가게 목록을 담을 상태
  const [stores, setStores] = useState<Store[]>([]);

  // 카테고리가 변경될 때마다 백엔드에서 데이터를 받아옵니다.

  useEffect(() => {
    if (category) {
      // 백엔드의 API 주소와 카테고리를 파라미터로 사용합니다.
      // 해당 주소와 요청 방식은 백엔드와 협의하여 결정해야 합니다.
      axios({
        url: `http://43.201.255.188:8811/store/big-category/4`,
        method: "GET",
        params: {},
      })
        .then((response) => {
          // 성공적으로 데이터를 받아오면 상태를 업데이트합니다.
          // console.log("응답 데이터: ", response.data);
          // console.log(response.data[0].storeId);
          setStores(response.data);
        })
        .catch((error) => {
          // 에러 처리
          // console.log(`${category}`);
          // console.error(error);
        });
    }
  }, [category]);

  return (
    <>
      <div className="list-title">{category}</div>
      <Paper>
        {stores.map((store, index) => (
          <div
            key={index}
            className="store-row"
            onClick={() => navigate(`/storePage/${store.storeId}`)}
          >
            <div className="store-thumbnail">
              <Avatar src={store.thumbnail} />
            </div>
            <div className="store-details">
              <div className="store-name">{store.storeName}</div>
              <div className="store-menu">{store.storeMenu}</div>
              <div className="store-address">{store.storeAddress}</div>
            </div>
          </div>
        ))}
      </Paper>
    </>
  );
}
