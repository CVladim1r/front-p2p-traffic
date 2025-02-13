import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppSchema {
    isLoading: boolean;
    errorMessage: string;
    authSuccess: boolean;
}

const initialState: AppSchema = {
    isLoading: true,
    errorMessage: "",
    authSuccess: false,
  };
  
  const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
      setErrorMessage: (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
      },
      setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      },
      setAuthSuccess: (state, action: PayloadAction<boolean>) => {
        state.authSuccess = action.payload;
      },
    },
  });
  
  export const { actions: appActions, reducer: appReducer } = appSlice;
  