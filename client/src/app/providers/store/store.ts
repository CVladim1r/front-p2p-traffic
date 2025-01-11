import {
  Action,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { GameSchema, gameReducer } from "@entities/Game";
import { UserSchema, userReducer } from "@entities/User";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ratingReducer } from "@entities/Rating";
import { RatingSchema } from "@entities/Rating/slice/ratingSlice";

export interface StateSchema {
  user: UserSchema;
  game: GameSchema;
  rating: RatingSchema;
}

export const createMainStore = () => {
  const store = configureStore({
    reducer: combineReducers({
      user: userReducer,
      game: gameReducer,
      rating: ratingReducer,
    }),
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppDispatch = ReturnType<typeof createMainStore>["dispatch"];
export const useAppDispatch =
  useDispatch.withTypes<ThunkDispatch<StateSchema, any, Action<any>>>();
