import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postOrder = createAsyncThunk(
    'order/order',
    async (token, { rejectWithValue }) => {
        try {
            const res = await axios(`http://192.168.1.24:3000/api/v1/order/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
          
            return data = res.data;
        } catch (e) {
            if(e.response.data){
                return rejectWithValue(e.response.data.message);
            }else{
                return rejectWithValue('Something went wrong');
            }
        }
    }
)