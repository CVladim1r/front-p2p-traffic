import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterData = {
  currencyType?: string,
  isVip?: boolean,
  guaranteed?: boolean,
  theme?: string
}

export interface FiltersSchema {
  activeFilter: string,
  data: FilterData,
}

const initialState: FiltersSchema = {
  activeFilter: "",
  data: {}
};
  
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleActiveFilter: (state, action: PayloadAction<string>) => {
      if (state.activeFilter == action.payload)
        state.activeFilter = ""
      else
        state.activeFilter = action.payload
    },
    setIsVip: (state, action: PayloadAction<boolean | undefined>) => {
      state.data.isVip = action.payload
    },
    setGuaranteed: (state, action: PayloadAction<boolean | undefined>) => {
      state.data.guaranteed = action.payload
    },
    setCurrencyType: (state, action: PayloadAction<string | undefined>) => {
      state.data.currencyType = action.payload
    },
    setTheme: (state, action: PayloadAction<string | undefined>) => {
      state.data.theme = action.payload
    },
  },
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;