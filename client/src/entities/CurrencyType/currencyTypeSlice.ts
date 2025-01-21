import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface currencyTypeSchema {
  currencyTypes: string[]
}

const initialState: currencyTypeSchema = {
  currencyTypes: []
};
  
const currencyTypeSlice = createSlice({
  name: "currencyType",
  initialState,
  reducers: {
    setcurrencyTypes: (state, action: PayloadAction<string[]>) => {
      state.currencyTypes = action.payload
    },
  },
});
  
export const { actions: currencyTypeActions, reducer: currencyTypeReducer } = currencyTypeSlice;
  