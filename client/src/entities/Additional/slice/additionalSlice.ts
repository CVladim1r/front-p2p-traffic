import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdditionalSchema {
  currencyTypes: string[],
  categories: string[],
  userAcquisitionType: string[],
}

const initialState: AdditionalSchema = {
  currencyTypes: [],
  categories: [],
  userAcquisitionType: [],
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
    setUserAcquisitionType: (state, action: PayloadAction<string[]>) => {
      state.userAcquisitionType = action.payload
    }
  },
});
  
export const { actions: additionalActions, reducer: additionalReducer } = additionalSlice;
  