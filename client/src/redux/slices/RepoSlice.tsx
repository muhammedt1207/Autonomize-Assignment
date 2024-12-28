import { createSlice } from "@reduxjs/toolkit";
import { fetchRepositories } from "../actions/RepoActions";

interface RepoState {
    data: any; 
    loading: boolean;
    error: string | null;
  }
  
  const initialState: RepoState = {
    data: [],
    loading: false,
    error: null,
  };
  

  
  const repoSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRepositories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchRepositories.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchRepositories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });

  export default repoSlice.reducer;