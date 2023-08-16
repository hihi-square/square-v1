import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Itype } from "modules/types";

// 공통 API 요청 주소
export const REST_API = "https://i9b208.p.ssafy.io:8080/";

const user = createSlice({
  name: "user",
  initialState: {
    usr_id: 24,
    id: "hong33245",
    nickname: "헬로",
  },
  reducers: {},
});

type data = {
  id: number;
  content: string;
  storeName: string;
  isRead: boolean;
};

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

const emdSlice = createSlice({
  name: "emd",
  initialState: {
    emdCode: "",
    depth: 0,
    currentName: "",
  },
  reducers: {
    setEmdCode: (state, action) => {
      state.emdCode = action.payload;
    },
    setDepth: (state, action) => {
      state.depth = action.payload;
    },
    setCurrentName: (state, action) => {
      state.currentName = action.payload;
    },
  },
});

export const { setEmdCode, setDepth, setCurrentName } = emdSlice.actions;

const notifications = createSlice({
  name: "notifications",
  initialState: {
    orderData: [] as data[],
    messageData: null as data | null,
    noticeData: null as data | null,
  },
  reducers: {
    pushOrderData: (state, action: PayloadAction<data>) => {
      state.orderData.push(action.payload);
    },
    setMessageData: (state, action: PayloadAction<data>) => {
      state.messageData = action.payload;
    },
    setNoticeData: (state, action: PayloadAction<data>) => {
      state.noticeData = action.payload;
    },
  },
});

export const { pushOrderData, setMessageData, setNoticeData } =
  notifications.actions;

const page = createSlice({
  name: "page",
  initialState: "메인",
  reducers: {
    setPage: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setSticky } = sticky.actions;
export const { setPage } = page.actions;

export type Choice = {
  storeId: number;
  storeThumbnail: string;
  storeName: string;
};

const choice = createSlice({
  name: "choice",
  initialState: {
    storeId: 0,
    storeThumbnail: "",
    storeName: "",
  },
  reducers: {
    setChoice: (state, action: PayloadAction<Choice>) => {
      state.storeId = action.payload.storeId;
      state.storeThumbnail = action.payload.storeThumbnail;
      state.storeName = action.payload.storeName;
    },
  },
});

export const { setChoice } = choice.actions;

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
  storeId: number;
  storeThumbnail: string;
  storeName: string;
  items: {
    productId: number;
    productThumbnail: string;
    productName: string;
    price: number;
    options: {
      optionId: number;
      optionName: string;
    }[];
    quantity: number;
    isChecked: boolean;
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
  selectedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,

  reducers: {
    setSelectedItems: (state, action) => {
      // 선택된 항목을 업데이트
      state.selectedItems = action.payload;
    },
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
    choice: choice.reducer,
    notifications: notifications.reducer, // 추가된 코드
    emd: emdSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
