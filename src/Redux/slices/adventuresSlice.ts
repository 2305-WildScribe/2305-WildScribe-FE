import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Adventure } from '../../types';
import { get } from 'http';

// import { userLogin, fetchUserAdventures} from '../../apiCalls'

interface AdventureState {
  adventures: Adventure[];
  isSuccessful: boolean;
  loading: boolean;
  error: string | undefined;
}

const initialState: AdventureState = {
  adventures: [],
  isSuccessful: false,
  loading: false,
  error: ''
};

export const getAdventuresAsync = createAsyncThunk(
  'user/getData',
  async (id: string, thunkAPI) => {
    const response = await fetch(
      'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user/adventures',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'adventures',
            attributes: {
              user_id: id,
            },
          },
        }),
      }
    )
      if (response.status === 404) {
        throw new Error('404 page not found');
      }
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    
      const data = await response.json()
      return data
    }
);

export const adventuresSlice = createSlice({
  name: 'adventures',
  initialState,
  reducers: {
    addAdventure: (state, action: PayloadAction<Adventure>) => {
      state.adventures.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder 
      .addCase(getAdventuresAsync.pending, (state) => {
          state.loading = true;
      })
      .addCase(getAdventuresAsync.fulfilled, (state, action)=> {
        state.adventures = action.payload.data.attributes
        state.isSuccessful = true
        state.loading = false
      })
      .addCase(getAdventuresAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.isSuccessful = false

      })
  },
});

export const { addAdventure } = adventuresSlice.actions;
export const selectAdventures = (state: RootState) =>
  state.adventures;
export default adventuresSlice.reducer;
