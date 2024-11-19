import { createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../order/api';

const initialState = {
    data: null, // variable untuk menyimpan data user
    status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
    message: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: { // kumpulan method untuk mengubah initial state secara synchronous8b6d755eae2cc70838571d4a737c681a27ef41
        resetOrder : (state) => initialState
    },
    extraReducers: (builder) => {

        //Get Profile Reducers
        builder.addCase(postOrder.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(postOrder.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(postOrder.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });
       
    }
});

export const selectOrder = (state) => state.order; // selector untuk mengambil state 
export const { resetOrder } = orderSlice.actions; // action untuk logout
export { postOrder }; // action untuk panggil api postLogin dan get Profile
export default orderSlice.reducer; // user reducer untuk di tambahkan ke store
