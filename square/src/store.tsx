// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

export type CartItem = {
    shopThumbnail: string;
    shopName: string;
    estimatedTime: string;
    items: {
      productThumbnail: string;
      productName: string;
      price: number;
      quantity: number;
    }[];
  };
  export type Item = {
    productThumbnail: string;
    productName: string;
    price: number;
    quantity: number;
  };
  
  export type Store = {
    shopThumbnail: string;
    shopName: string;
    estimatedTime: string;
    items: Item[];
  };
  
  export type CartState = Store[];
  

// 장바구니 초기 상태
const cartInitialState: CartItem[] = [
    {
        shopThumbnail: '가게1이미지URL',
        shopName: '가게1',
        estimatedTime: '30분',
        items: [
            {
                productThumbnail: '상품1이미지URL',
                productName: '상품1',
                price: 5000,
                quantity: 3,
            },
            // 기타 상품
        ],
    },
    {
      shopThumbnail: '가게2이미지URL',
      shopName: '가게2',
      estimatedTime: '12분',
      items: [
          {
              productThumbnail: '상품2이미지URL',
              productName: '상품2',
              price: 900,
              quantity: 6,
          },
          {
            productThumbnail: '상품3이미지URL',
            productName: '상품3',
            price: 8000,
            quantity: 1,
        },
          // 기타 상품
      ],
  },
    // 기타 가게
];
  
const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItem: (state: CartItem[], action) => {
      // 아이템 추가 로직
    },
    removeItem: (state: CartItem[], action) => {
      // 아이템 삭제 로직
    },
    // 필요한 다른 리듀서
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const { actions: cartActions } = cartSlice;
export default store;
