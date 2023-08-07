import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Itype } from "modules/types";

const user = createSlice({
  name: "user",
  initialState: {
    usr_id: 24,
    id: "hong33245",
    nickname: "헬로",
  },
  reducers: {},
});

export const REST_API = "http://i9b208.p.ssafy.io:8811/";

type Sticky = {
  pageType: "main" | "store";
  value: number;
};

const sticky = createSlice({
  name: "sticky",
  initialState: {
    main: 0,
    store: 0,
  },
  reducers: {
    setSticky: (state, action: PayloadAction<Sticky>) => {
      const { pageType, value } = action.payload;

      if (Object.prototype.hasOwnProperty.call(state, pageType)) {
        state[pageType] = value;
      }
    },
  },
});

const page = createSlice({
  name: "page",
  initialState: "메인",
  reducers: {
    setPage: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setSticky } = sticky.actions;
export const { setPage } = page.actions;

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
    sticky: sticky.reducer,
    page: page.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
