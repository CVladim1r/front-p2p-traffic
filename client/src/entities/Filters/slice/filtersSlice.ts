import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterData = {
  currencyTypes: string[],
  isVip?: boolean,
  sources: string[],
  guaranteed?: boolean,
}

export interface FiltersSchema {
  activeFilter: string,
  data: FilterData,
}

const initialState: FiltersSchema = {
  activeFilter: "",
  data: {
    currencyTypes: [],
    sources: [],
  }
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
    toggleCurrencyType: (state, action: PayloadAction<string>) => {
      const i = state.data.currencyTypes.indexOf(action.payload)
      if (i != -1)
        state.data.currencyTypes.splice(i, 1)
      else
        state.data.currencyTypes.push(action.payload)
    },
    toggleSource: (state, action: PayloadAction<string>) => {
      const i = state.data.sources.indexOf(action.payload)
      if (i != -1)
        state.data.sources.splice(i, 1)
      else
        state.data.sources.push(action.payload)
    },
  },
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;