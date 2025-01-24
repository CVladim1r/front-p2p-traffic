import {
  Action,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { UserSchema, userReducer } from "../../../entities/User";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appReducer, AppSchema } from "../../../entities/App";
import { addAdReducer, AddAdSchema } from "../../../entities/AddAd";
import { logReducer, LogSchema } from "../../../entities/Log";
import { additionalReducer, AdditionalSchema } from "../../../entities/Additional";
import { filtersReducer, FiltersSchema } from "../../../entities/Filters";

export interface StateSchema {
  user: UserSchema;
  app: AppSchema;
  addAd: AddAdSchema;
  log: LogSchema;
  additional: AdditionalSchema;
  filters: FiltersSchema;
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
    },
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppDispatch = ReturnType<typeof createMainStore>["dispatch"];
export const useAppDispatch =
  useDispatch.withTypes<ThunkDispatch<StateSchema, any, Action<any>>>();
