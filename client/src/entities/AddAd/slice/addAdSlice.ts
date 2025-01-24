import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_ORDER_SOURCE } from "../consts/consts";

export type AdData = {
  price?: number,
  currencyType?: string,
  // type?: string,
  source?: string,
  guaranteed?: boolean,
  // min?: number,
  theme?: string,
  placing?: "free" | "pay",
  // name?: string,
  // description?: string,
  amount?: number,
  amountType?: "min" | "max",
}

export interface AddAdSchema {
  data: AdData,
  isSending: boolean,
}

const initialState: AddAdSchema = {
  data: {
    source: localStorage.getItem(USER_ORDER_SOURCE) ?? undefined
  },
  isSending: false,
};
  
const addAdSlice = createSlice({
  name: "addAdd",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<AdData>) => {
      state.data = action.payload;
    },
    setSource: (state, action: PayloadAction<string>) => {
      localStorage.setItem(USER_ORDER_SOURCE, action.payload)
      state.data.source = action.payload;
    },
    clearData: (state) => {
      state.data = {source: localStorage.getItem(USER_ORDER_SOURCE) ?? undefined}
      state.isSending = false
    },
    setIsSending: (state, action: PayloadAction<boolean>) => {
      state.isSending = action.payload
    }
  },
});
  
export const { actions: addAdActions, reducer: addAdReducer } = addAdSlice;
  