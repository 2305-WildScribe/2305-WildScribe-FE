import { configureStore } from '@reduxjs/toolkit';
import adventuresSlice from './slices/adventuresSlice';
import userSlice from './slices/userSlice';
// import adventureReducer from './reducers/adventureReducer';

export const store = configureStore({
  reducer: {
    adventures: adventuresSlice,
    userId: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
