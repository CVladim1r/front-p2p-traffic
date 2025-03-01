import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdCreate } from "../../../shared/api";
import { USER_ORDER_SOURCE } from "../consts/consts";

export interface AddAdSchema {
    data?: AdCreate,
    savedSource?: string
}

export type FilterData = {
    currencyType?: string,
    isVip?: boolean,
    guaranteed?: boolean,
    theme?: string
}

export interface AdsSchema {
    activeFilter: string,
    filterData: FilterData,
}

export interface MoneyChangeSchema {
    receiptLink?: string
}

export interface PagesSchema {
    addAd: AddAdSchema
    ads: AdsSchema,
    moneyChange: MoneyChangeSchema,
}
const initialState: PagesSchema = {
    addAd: {
        savedSource: localStorage.getItem(USER_ORDER_SOURCE) ?? undefined,
    },
    ads: {
        activeFilter: "",
        filterData: {}
    },
    moneyChange: {},
};
  
const pagesSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        setAddAdData: (state, action: PayloadAction<AdCreate>) => {
            state.addAd.data = action.payload;
        },
        setAddAdSavedSource: (state, action: PayloadAction<string>) => {
            localStorage.setItem(USER_ORDER_SOURCE, action.payload)
            state.addAd.savedSource = action.payload;
        },
        clearAddAdData: (state) => {
            state.addAd.data = undefined;
        },

        setMoneyChangeReceiptLink: (state, action: PayloadAction<string>) => {
            state.moneyChange.receiptLink = action.payload
        },

        toggleAdsActiveFilter: (state, action: PayloadAction<string>) => {
            if (state.ads.activeFilter == action.payload)
                state.ads.activeFilter = ""
            else
                state.ads.activeFilter = action.payload
        },
        setAdsIsVip: (state, action: PayloadAction<boolean | undefined>) => {
            state.ads.filterData.isVip = action.payload
        },
        setAdsGuaranteed: (state, action: PayloadAction<boolean | undefined>) => {
            state.ads.filterData.guaranteed = action.payload
        },
        setAdsCurrencyType: (state, action: PayloadAction<string | undefined>) => {
            state.ads.filterData.currencyType = action.payload
        },
        setAdsTheme: (state, action: PayloadAction<string | undefined>) => {
            state.ads.filterData.theme = action.payload
        },
    },
});
  
export const { actions: pagesActions, reducer: pagesReducer } = pagesSlice;
  