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

export const store = configureStore({
  reducer: {
    user: user.reducer,
    types: types.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
