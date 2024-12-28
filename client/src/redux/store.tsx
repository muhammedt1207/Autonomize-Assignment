import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import repoReducer from './slices/RepoSlice';
// import followerReducer from './slices/followerSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    repositories: repoReducer,
    // followers: followerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;