import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
import carSlice  from './cars/index';
import detailSlice from './cars/Detail';
import timerSlice from './timer/index'
import timerReducer from './timer/timer10'


const rootReducer = combineReducers({
    user: userSlice,
    cars : carSlice,
    detail : detailSlice,
    timer : timerSlice,
    timer10 : timerReducer

})

export default rootReducer;
