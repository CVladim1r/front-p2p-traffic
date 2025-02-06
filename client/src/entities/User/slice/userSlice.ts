import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserMainPageOut } from "../../../shared/api";
import { USER_ACCESS_TOKEN_KEY } from "../consts/consts";
import { StateSchema } from "../../../app/providers/store";

export interface UserSchema {
  isLoggingIn: boolean;
  authorization: string;
  data?: UserMainPageOut;
  wallet?: string;
}

const initialState: UserSchema = {
  isLoggingIn: true,
  authorization: localStorage.getItem(USER_ACCESS_TOKEN_KEY) ?? "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserMainPageOut>) => {
      state.data = action.payload;
    },
    setUserIsLogging: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
    setAuthorization: (state, action: PayloadAction<string>) => {
      if (action.payload)
        localStorage.setItem(USER_ACCESS_TOKEN_KEY, action.payload);
      else
        localStorage.removeItem(USER_ACCESS_TOKEN_KEY)
      state.authorization = action.payload;
    },
  },
});

export const selectAuthorization = (state: StateSchema) => state.user.authorization

export const { actions: userActions, reducer: userReducer } = userSlice;
