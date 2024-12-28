import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FetchFollowersParams {
  username: string;
  type: string;
}

export const fetchFollowers = createAsyncThunk(
  'followers/fetchFollowers', 
  async ({username, type }: FetchFollowersParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/${type}`);
      console.log(response,'responce')
      return response.data

    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
  
);
