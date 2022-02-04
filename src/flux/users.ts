import { createReducer, createAction } from "@reduxjs/toolkit";

import { User, usersApi } from "./../api/users";

// const meThunk = createAsyncThunk("auth/users/me/", usersApi.me);
// const loginThunk = createAsyncThunk("auth/token/login/", usersApi.login);

const initialState = {
  me: null as User | null,
  token: null as string | null,
};

export const getMe = createAction<User>("ME");
export const login = createAction<string>("LOGIN");

export default createReducer(initialState, (builder) => {
  builder.addCase(getMe, (state, action) => {
    state.me = action.payload;
  });
  builder.addCase(login, (state, action) => {
    state.token = action.payload;
  });
});
