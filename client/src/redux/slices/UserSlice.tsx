import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/UserActions";

const initialState: {
    data: any;
    loading: boolean;
    error: string | number | null;
  } = {
    data: null,
    loading: false,
    error: null, 
  };
  
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch user';
        });
    },
  });

  export default userSlice.reducer;