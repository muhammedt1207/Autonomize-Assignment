import { createSlice } from '@reduxjs/toolkit';
import { fetchFollowers } from '../actions/FollowActions';

interface Follower {
  id: number;
  login: string;
  avatar_url: string;
  name?: string;
}

interface FollowersState {
  data: Follower[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowersState = {
  data: [],
  loading: false,
  error: null,
};

const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch followers';
      });
  },
});

export default followersSlice.reducer;
