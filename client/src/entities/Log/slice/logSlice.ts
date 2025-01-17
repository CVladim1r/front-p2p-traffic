import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AdData = {
  price: number,
  type: string,
  source: string,
  guaranteed: boolean,
  min: number,
  pay: string,
  theme?: string 
  placing?: "free" | "pay"
  name?: string
  description?: string
}

export interface AddAdSchema {
  data: AdData
}

const initialState: AddAdSchema = {
  data: {
    guaranteed: true,
    min: 0,
    pay: "",
    price: 0,
    source: "",
    type: "",
    description: "",
    name: "",
    placing: "free",
    theme: ""
  }
};
  
const addAdSlice = createSlice({
  name: "addAdd",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<AdData>) => {
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = initialState.data
    },
  },
});
  
export const { actions: addAdActions, reducer: addAdReducer } = addAdSlice;
  