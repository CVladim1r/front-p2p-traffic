import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface additionalSchema {
  currencyTypes: string[],
  categories: string[],
}

const initialState: additionalSchema = {
  currencyTypes: [],
  categories: [],
};
  
const additionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    setCurrencyTypes: (state, action: PayloadAction<string[]>) => {
      state.currencyTypes = action.payload
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
  },
});
  
export const { actions: additionalActions, reducer: additionalReducer } = additionalSlice;
  