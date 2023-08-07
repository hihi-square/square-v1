import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Itype } from "types";

const user = createSlice({
  name: "user",
  initialState: "ssafy",
  reducers: {},
});

const types = createSlice({
  name: "types",
  initialState: [
    {
      id: 1,
      name: "빵",
    },
    {
      id: 2,
      name: "샐러드",
    },
    {
      id: 3,
      name: "우유",
    },
  ] as Itype[],
  reducers: {},
});

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
  isSelected?: boolean;
};

export type Store = {
  shopThumbnail: string;
  shopName: string;
  estimatedTime: string;
  items: Item[];
};
export type CartState = Store[];

const cartInitialState = {

  selectedItems: []
};




const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  
  reducers: {
    setSelectedItems: (state, action) => {
      // 선택된 항목을 업데이트
      state.selectedItems = action.payload;
    }
  },
});

export const { actions: cartActions } = cartSlice; 

export const store = configureStore({
  reducer: {
    user: user.reducer,
    types: types.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
