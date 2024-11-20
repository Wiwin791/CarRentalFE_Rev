import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async ({form,token}, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://172.17.32.206:3000/api/v1/order', form,
                {
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