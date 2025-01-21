import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AdData = {
  price?: number,
  type: string,
  source: string,
  guaranteed: boolean,
  min?: number,
  pay: string,
  theme?: string,
  placing?: "free" | "pay",
  name?: string,
  description?: string,
}

export interface AddAdSchema {
  data?: AdData,
  isSending: boolean,
}

const initialState: AddAdSchema = {
  isSending: false,
};
  
const addAdSlice = createSlice({
  name: "addAdd",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<AdData>) => {
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = undefined
      state.isSending = false
    },
    setIsSending: (state, action: PayloadAction<boolean>) => {
      state.isSending = action.payload
    }
  },
});
  
export const { actions: addAdActions, reducer: addAdReducer } = addAdSlice;
  