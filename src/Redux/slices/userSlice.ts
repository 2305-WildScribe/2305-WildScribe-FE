import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { userCreateAsync, userLoginAsync } from './AsyncThunks';
// import { userLogin, fetchUserAdventures} from '../../apiCalls'

interface UserState {
  isLoggedIn: boolean;
  user_id: string;
  userName: string;
  isSuccessful: boolean;
  loading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  isLoggedIn: false,
  user_id: '',
  userName: '',
  isSuccessful: false,
  loading: false,
  error: '',
};

// it's good practice to have async thunks in a separate file



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    resetUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(userLoginAsync.pending, state => {
        state.loading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user_id = action.payload.data.attributes.user_id;
        state.userName = action.payload.data.attributes.name;
        state.isSuccessful = true;
        state.isLoggedIn = true;
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccessful = false;
      })
      .addCase(userCreateAsync.pending, state => {
        state.loading = true;
      })
      .addCase(userCreateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user_id = action.payload.data.attributes.user_id;
        state.userName = action.payload.data.attributes.name;
        state.isSuccessful = true;
        state.isLoggedIn = true;
      })
      .addCase(userCreateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccessful = false;
      })
  },
});

export const { toggleIsLoggedIn, resetUserId } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
