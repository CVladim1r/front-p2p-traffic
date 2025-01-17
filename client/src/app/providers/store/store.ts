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

export interface StateSchema {
  user: UserSchema;
  app: AppSchema;
  addad: AddAdSchema;
}

export const createMainStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      app: appReducer,
      addad: addAdReducer,
    },
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppDispatch = ReturnType<typeof createMainStore>["dispatch"];
export const useAppDispatch =
  useDispatch.withTypes<ThunkDispatch<StateSchema, any, Action<any>>>();
