import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderModule from '../../HeaderModule'; 

type StoreInfoProps = {
  storeId?: string;
};

type Store = {
  storeName: string;
  storePhone: string;
  address: string;
  content: string;
  backgroundImgUrl: string;
};

function StoreInfo({ storeId }: StoreInfoProps) {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {

    axios({
      url: `http://43.201.255.188:8811/store/header/${storeId}`,
      method: "GET",
      params: {
   
      },})
    
      .then(response => {
        
        const { storeName, storePhone, address, content, backgroundImgUrl } = response.data;

        setStore({ storeName, storePhone, address, content, backgroundImgUrl });
      })
      .catch(error => {

        console.error("There was an error!", error);
      });
  }, [storeId]);

  return (
    <>
     {store && (
        <div 
          className="StoreInfo-background" 
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/dungG.png)`,
            backgroundSize: 'cover',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <HeaderModule /> 
          <h1>{store.storeName}</h1>
          <h2>{store.storePhone}</h2>
          <p>{store.address}</p>
        </div>
      )}
      {store && (
        <div 
          style={{
            height: '20%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            borderRadius: '5px',
            margin: '10px',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <h4>가게 공지</h4>
          <br />
          <p>{store.content}</p>    
        </div>
      )}
    </>
  );
}

export default StoreInfo;
