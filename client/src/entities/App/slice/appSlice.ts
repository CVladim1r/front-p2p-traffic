import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ErrorTypes {
  noTgData,
  notFound
}

export interface AppSchema {
    isLoading: boolean;
    errorMessage: string;
    error?: ErrorTypes
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
      setError: (state, action: PayloadAction<ErrorTypes | undefined>) => {
        state.error = action.payload;
      },
    },
  });
  
  export const { actions: appActions, reducer: appReducer } = appSlice;
  