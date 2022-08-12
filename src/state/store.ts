import { configureStore } from '@reduxjs/toolkit';
import repositoriesSlice from './slices/RepositoriesSlice';

export const store = configureStore({
  reducer: {
    repositories: repositoriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
