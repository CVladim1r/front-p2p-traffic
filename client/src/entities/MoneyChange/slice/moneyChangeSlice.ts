import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MoneyChangeSchema {
  receiptLink?: string
}

const initialState: MoneyChangeSchema = {};
  
const moneyChangeSlice = createSlice({
  name: "moneyChange",
  initialState,
  reducers: {
    setReceiptLink: (state, action: PayloadAction<string>) => {
      state.receiptLink = action.payload
    },
  },
});
  
export const { actions: moneyChangeActions, reducer: moneyChangeReducer } = moneyChangeSlice;
  