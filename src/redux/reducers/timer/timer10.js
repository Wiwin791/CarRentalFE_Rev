import { createSlice } from '@reduxjs/toolkit';

// Slice untuk timer
const initialState = {
  timeLeft: 600, // Waktu awal dalam detik (10 menit)
};

const timerSlice = createSlice({
  name: 'timer10',
  initialState,
  reducers: {
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload; // Mengupdate waktu yang tersisa
    },
  },
});

export const { setTimeLeft } = timerSlice.actions;
export default timerSlice.reducer;
