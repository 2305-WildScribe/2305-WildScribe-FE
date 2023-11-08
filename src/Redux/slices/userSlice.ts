import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
// import { userLogin, fetchUserAdventures} from '../../apiCalls'


interface UserState {
  userID: string;
  userName: string;
  isSuccessful: boolean;
  loading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  userID: '',
  userName: '',
  isSuccessful: false,
  loading: false,
  error: '',
};

// it's good practice to have async thunks in a separate file

export const userLoginAsync = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const response = await fetch(
      'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'user',
            attributes: {
              email: email,
              password: password,
            },
          },
        }),
      }
    );

    if (response.status === 404) {
      throw new Error('404 page not found');
    }

    if (!response.ok) {
      throw new Error('error');
    }

    const data = await response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userID = action.payload.data.attributes.user_id;
        state.userName = action.payload.data.attributes.name;
        state.isSuccessful = true;
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccessful = false;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
