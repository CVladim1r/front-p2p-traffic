import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppSchema {
    isLoading: boolean;
    error: string;
}

const initialState: AppSchema = {
    isLoading: true,
    error: "",
  };
  
  const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
      setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      },
      setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      },
    },
  });
  
  export const { actions: appActions, reducer: appReducer } = appSlice;
  