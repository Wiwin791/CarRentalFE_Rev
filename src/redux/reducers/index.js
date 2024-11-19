import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
import carSlice  from './cars/index';
import detailSlice from './cars/Detail';
import timerSlice from './timer/index';
import orderSlice from './order/index'

const rootReducer = combineReducers({
    user: userSlice,
    cars : carSlice,
    detail : detailSlice,
    timer : timerSlice,
    order : orderSlice

})

export default rootReducer;
