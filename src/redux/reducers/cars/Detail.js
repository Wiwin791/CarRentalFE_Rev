import { createSlice } from "@reduxjs/toolkit";
import { getCarsDetails } from "./api";

const initialState = {
    data: null,
    status: 'idle',
    message: null
}

const detailSlice = createSlice ({
    name : 'car',
    initialState,
    reducers : {
        resetDetail: (state, action) => {
            state.data = null;
            state.status = 'idle';
            state.message = null;
        },
    },
    extraReducers : (builder) => {
        builder.addCase(getCarsDetails.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getCarsDetails.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data
            state.message = action.payload.message;
        });
        builder.addCase(getCarsDetails.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });
    }
})

export const selectDetail = (state) => state.detail
export const {resetDetail} = detailSlice.actions
export {getCarsDetails}
export default detailSlice.reducer