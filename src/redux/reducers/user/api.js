import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../config/axios";

export const postLogin = createAsyncThunk(
    'user/postLogin',
    async (payload, {rejectWithValue}) => {
     
        try {
          const response = await axios.post(
            'http://192.168.1.24:3000/api/v1/auth/signin',
               payload ,{
                headers : {
                    'Content' : 'application/json' 
                }
              }
            );

            const data = response.data;
            return data;
          }  catch (error) {
            
            if (error.response.data) {
              return rejectWithValue(error.response.data.message)
             
            }else {
              return rejectWithValue("Somethink when wrong")
            }
        
        
          }

    }
) 


export const postRegister = createAsyncThunk(
  'user/postRegister',
  async (payload, {rejectWithValue}) => {
   
      try {
        const response = await axios.post(
          'http://192.168.1.24:3000/api/v1/auth/signup',
             payload ,{
              headers : {
                  'Content' : 'application/json' 
              }
            }
          );
          const data = response.data;
          return data;
        }  catch (error) {
          
          if (error.response.data) {
            return rejectWithValue(error.response.data.message)
           
          }else {
            return rejectWithValue("Somethink went wrong")
          }
      
      
        }

  }
) 


export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (token,{rejectWithValue}) =>  {

        try {
          const response = await axios.get(
            'http://192.168.1.24:3000/api/v1/auth/whoami',
               {
                headers : {
                    'Content' : 'application/json' ,
                    Authorization : `Bearer ${token}`
                }})

                const {data} = response.data
                return data;

        } catch(error){
    if(error.response.data) {
        return rejectWithValue(error.response.data.message)

    }
    else {
        return rejectWithValue('Something When Wrong')
    }
        }
    }
   
)

export const GoogleLogin = createAsyncThunk(
    'user/googleLogin',
    async (payload,{rejectWithValue}) =>  {

        try {
          const response = await axios.post(
            'http://192.168.1.24:3000/api/v1/auth/googleSignIn',payload)

                const data = response.data
                return data;

        } catch(error){
    if(error.response.data) {
        return rejectWithValue(error.response.data.message)

    }
    else {
        return rejectWithValue('Something When Wrong')
    }
        }
    }
   
)