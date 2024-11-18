import { createSlice } from '@reduxjs/toolkit';
import { getCars } from './api';

const initialState = {
    data: null, // variable untuk menyimpan data user
    status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
    message: null,
}

export const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: { // kumpulan method untuk mengubah initial state secara synchronous8b6d755eae2cc70838571d4a737c681a27ef41
        resetCar : (state) => initialState
    },
    extraReducers: (builder) => {

        //Get Profile Reducers
        builder.addCase(getCars.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getCars.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data;
            state.message = action.payload.message;
        });
        builder.addCase(getCars.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });
       
    }
});

export const selectCars = (state) => state.cars; // selector untuk mengambil state user
export const { resetCar } = carSlice.actions; // action untuk logout
export { getCars }; // action untuk panggil api postLogin dan get Profile
export default carSlice.reducer; // user reducer untuk di tambahkan ke store
