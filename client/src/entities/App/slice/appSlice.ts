import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppSchema {
    isLoading: boolean;
    authDone: boolean,
    error: string;
}

const initialState: AppSchema = {
    isLoading: true,
    authDone: false,
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
      setAuthDone: (state, action: PayloadAction<boolean>) => {
        state.authDone = action.payload;
      },
    },
  });
  
  export const { actions: appActions, reducer: appReducer } = appSlice;
  