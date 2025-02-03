import { configureStore } from "@reduxjs/toolkit";
import { UserSchema, userReducer } from "../../../entities/User";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appReducer, AppSchema } from "../../../entities/App";
import { addAdReducer, AddAdSchema } from "../../../entities/AddAd";
import { logReducer, LogSchema } from "../../../entities/Log";
import { additionalReducer, AdditionalSchema } from "../../../entities/Additional";
import { filtersReducer, FiltersSchema } from "../../../entities/Filters";
import { moneyChangeReducer, MoneyChangeSchema } from "../../../entities/MoneyChange";

export interface StateSchema {
  user: UserSchema;
  app: AppSchema;
  addAd: AddAdSchema;
  log: LogSchema;
  additional: AdditionalSchema;
  filters: FiltersSchema;
  moneyChange: MoneyChangeSchema;
}

export const createMainStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      app: appReducer,
      addAd: addAdReducer,
      log: logReducer,
      additional: additionalReducer,
      filters: filtersReducer,
      moneyChange: moneyChangeReducer,
    },
  });
  setupListeners(store.dispatch);
  return store;
};