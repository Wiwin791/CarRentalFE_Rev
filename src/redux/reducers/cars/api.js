import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCars = createAsyncThunk(
    'user/getCars',
    async (token, { rejectWithValue }) => {
        try {
            const res = await axios('http://192.168.1.24:3000/api/v1/cars', {
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

export const getCarsDetails = createAsyncThunk(
    'user/getCarsDetails',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://192.168.1.24:3000/api/v1/cars/getId/${id}`);
            return data = res.data
          
            
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);