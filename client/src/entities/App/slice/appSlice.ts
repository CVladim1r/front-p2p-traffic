import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppSchema {
    isLoading: boolean;
    errorMessage: string;
    noTgData: boolean;
}

const initialState: AppSchema = {
    isLoading: true,
    errorMessage: "",
    noTgData: false,
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
      setNoTgData: (state, action: PayloadAction<boolean>) => {
        state.noTgData = action.payload;
      },
    },
  });
  
  export const { actions: appActions, reducer: appReducer } = appSlice;
  