import { combineReducers, configureStore } from "@reduxjs/toolkit";

import users from "./users";

const rootReducer = combineReducers({
  users,
});

export default configureStore({
  reducer: rootReducer,
});
