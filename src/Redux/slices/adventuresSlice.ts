import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Adventure } from '../../types';
import { getAdventuresAsync, postAdventureAsync } from './AsyncThunks';

interface AdventureState {
  adventures: Adventure[];
  loading: boolean;
  error: string | undefined;
}

const initialState: AdventureState = {
  adventures: [],
  loading: false,
  error: '',
};

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
      .addCase(getAdventuresAsync.fulfilled, (state, action) => {
        state.adventures = action.payload.data.attributes;
        state.loading = false;
      })
      .addCase(getAdventuresAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postAdventureAsync.fulfilled, (state, action) => {
        const { newAdventure, data } = action.payload;
        newAdventure.adventure_id = data.data.attributes.adventure_id;
        state.adventures = [...state.adventures, newAdventure];
        console.log('payload: ', action.payload);
      })
      .addCase(postAdventureAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { addAdventure } = adventuresSlice.actions;
export const selectAdventures = (state: RootState) => state.adventures;
export default adventuresSlice.reducer;
