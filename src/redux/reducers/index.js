import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { userSlice } from "./user";

const rootReducer = combineReducers({
    user: userSlice,
})

export default rootReducer;