import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL="http://localhost:5000/api"

export const fetchRepositories = createAsyncThunk(
    'repositories/fetchRepositories',
    async (username: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        return response.data; 
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );