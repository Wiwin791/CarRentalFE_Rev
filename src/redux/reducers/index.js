<<<<<<< HEAD
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
=======
import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { userSlice } from "./user";
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41

const rootReducer = combineReducers({
    user: userSlice,
})

<<<<<<< HEAD
export default rootReducer;
=======
export default rootReducer;
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41
