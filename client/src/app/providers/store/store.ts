import {
  Action,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { UserSchema, userReducer } from "../../../entities/User";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appReducer, AppSchema } from "../../../entities/App/slice/appSlice";
import { addAdReducer, AddAdSchema } from "../../../entities/AddAd/slice/addAdSlice";
import { logReducer, LogSchema } from "../../../entities/Log/slice/logSlice";
import { additionalReducer, additionalSchema } from "../../../entities/Additional/additionalSlice";

export interface StateSchema {
  user: UserSchema;
  app: AppSchema;
  addAd: AddAdSchema;
  log: LogSchema;
  additional: additionalSchema;
}

export const createMainStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      app: appReducer,
      addAd: addAdReducer,
      log: logReducer,
      additional: additionalReducer,
    },
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppDispatch = ReturnType<typeof createMainStore>["dispatch"];
export const useAppDispatch =
  useDispatch.withTypes<ThunkDispatch<StateSchema, any, Action<any>>>();
