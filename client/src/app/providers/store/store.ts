import {
  Action,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { UserSchema, userReducer } from "../../../entities/User";
import { setupListeners } from "@reduxjs/toolkit/query";

export interface StateSchema {
  user: UserSchema;
}

export const createMainStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppDispatch = ReturnType<typeof createMainStore>["dispatch"];
export const useAppDispatch =
  useDispatch.withTypes<ThunkDispatch<StateSchema, any, Action<any>>>();
