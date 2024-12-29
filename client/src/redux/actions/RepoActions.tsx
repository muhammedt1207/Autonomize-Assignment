import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint } from "../../config/EndPoints";



export const fetchRepositories = createAsyncThunk(
    'repositories/fetchRepositories',
    async (username: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${endpoint}/${username}/repos`);
        return response.data; 
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );