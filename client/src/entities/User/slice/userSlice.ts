import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserMainPageOut } from "../../../shared/api";
import { USER_ACCESS_TOKEN_KEY } from "../consts/consts";

export interface UserSchema {
  isLoggingIn: boolean;
  authorization: string;
  _initialized: boolean;
  data?: UserMainPageOut;
  error?: string;
  wallet?: string;
}

const initToken = localStorage.getItem(USER_ACCESS_TOKEN_KEY);

const initialState: UserSchema = {
  isLoggingIn: true,
  authorization: initToken
    ? `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
    : "",
  _initialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserMainPageOut>) => {
      state.data = action.payload;
      console.log(action.payload);
    },
    setUserIsLogging: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
    setUserError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    initauthorization: (state) => {
      const at = localStorage.getItem(USER_ACCESS_TOKEN_KEY);
      if (at) {
        state.authorization = `Bearer ${at}`;
      }
      state._initialized = true;
    },
    setauthorization: (state, action: PayloadAction<string>) => {
      state.authorization = action.payload;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
