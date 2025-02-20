import { configureStore } from "@reduxjs/toolkit";
import { UserSchema, userReducer } from "../../../entities/User";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appReducer, AppSchema } from "../../../entities/App";
import { logReducer, LogSchema } from "../../../entities/Log";
import { additionalReducer, AdditionalSchema } from "../../../entities/Additional";
import { pagesReducer, PagesSchema } from "../../../entities/Pages/slice/pagesSlice";

export interface StateSchema {
  user: UserSchema;
  app: AppSchema;
  log: LogSchema;
  additional: AdditionalSchema;
  pages: PagesSchema,
}

export const createMainStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      app: appReducer,
      log: logReducer,
      additional: additionalReducer,
      pages: pagesReducer,
    },
  });
  setupListeners(store.dispatch);
  return store;
};