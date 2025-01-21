import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LogSchema {
  logs: string[]
}

const initialState: LogSchema = {
  logs: []
};
  
const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<string[]>) => {
      state.logs = action.payload
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload)
    },
  },
});
  
export const { actions: logActions, reducer: logReducer } = logSlice;
  