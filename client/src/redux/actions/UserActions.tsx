import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint } from "../../config/EndPoints";


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (username: string, { rejectWithValue }) => {
        try {
          const response = await axios.get(`${endpoint}/${username}`);
          console.log(response,'-------');
          
          return response.data; 

        } catch (error: any) {
          return rejectWithValue(error.message);
        }
      }
  );