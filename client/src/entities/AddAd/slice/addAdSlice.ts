import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_ORDER_SOURCE } from "../consts/consts";
import { AdCreate } from "../../../shared/api";

export interface AddAdSchema {
  data?: AdCreate,
  savedSource?: string
  // isSending: boolean,
}

const initialState: AddAdSchema = {
  savedSource: localStorage.getItem(USER_ORDER_SOURCE) ?? undefined,
  // isSending: false,
};
  
const addAdSlice = createSlice({
  name: "addAdd",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<AdCreate>) => {
      state.data = action.payload;
    },
    setSavedSource: (state, action: PayloadAction<string>) => {
      localStorage.setItem(USER_ORDER_SOURCE, action.payload)
      state.savedSource = action.payload;
    },
    clearData: (state) => {
      state.data = undefined;
    },
  },
});
  
export const { actions: addAdActions, reducer: addAdReducer } = addAdSlice;
  