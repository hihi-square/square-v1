import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,useLocation  } from 'react-router-dom';
import { Paper, Avatar } from "@mui/material";
import "../../../App.css";
import HeaderModule from '../HeaderModule';

export default function StoreListByCategory() {
  const REST_API: string = "http://i9b208.p.ssafy.io:8811";
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const location = useLocation();
  const categoryName = location.state?.categoryName ?? '';


  type Store = {
    scbId: string;
    thumbnail: string;
    storeId : number;
    storeName: string;
    storeMenu: string;
    storeAddress: string;
  };

  // 가게 목록을 담을 상태
  const [stores, setStores] = useState<Store[]>([]);


  
  // 카테고리가 변경될 때마다 백엔드에서 데이터를 받아옵니다.
  
  useEffect(() => {
    if (category) {
      axios({
        url: `${REST_API}/store/big-category/${category}`,
        method: "GET",
        params: {
     
        },
      })
        .then(response => {
          // 성공적으로 데이터를 받아오면 상태를 업데이트합니다.
          setStores(response.data);
        })
        .catch(error => {
          // 에러 처리
          
          console.log(`${category}`);
          console.error(error);
        });
    }
  }, [category]);
  return (
    <>
    <HeaderModule /> 
      <div className="list-title" style={{ marginTop: '50px' }}>{categoryName}</div>
 <Paper>
        {stores.map((store, index) => (
          <div
            key={index}
            className="store-row"
            onClick={() => navigate(`/storePage/${store.storeId}`)}
          >
            <div className="store-thumbnail"><Avatar src={store.thumbnail} /></div>
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