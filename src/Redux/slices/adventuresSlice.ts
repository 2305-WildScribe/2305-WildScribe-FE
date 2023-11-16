import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Adventure } from '../../types';
import {
  deleteAdventureAsync,
  editAdventureAsync,
  getAdventuresAsync,
  postAdventureAsync,
} from './AsyncThunks';

interface AdventureState {
  adventures: Adventure[];
  loading: boolean;
  error: string | undefined;
  singleAdventure: Adventure | undefined;
}

const initialState: AdventureState = {
  adventures: [],
  loading: false,
  error: '',
  singleAdventure: undefined,
};

export const adventuresSlice = createSlice({
  name: 'adventures',
  initialState,
  reducers: {
    setSingleAdventure(state, action) {
      state.singleAdventure = action.payload;
      console.log('here', state.singleAdventure);
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
      })
      .addCase(postAdventureAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteAdventureAsync.fulfilled, (state, action) => {
        const newState = state.adventures.filter(
          (adventure) => adventure.adventure_id !== action.payload
        );
        state.adventures = newState;
      })
      .addCase(deleteAdventureAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editAdventureAsync.fulfilled, (state, action) => {
        const adventureIndex = state.adventures.findIndex(
          (adventure) => adventure.adventure_id === action.payload.adventure_id
        );
        state.adventures.splice(adventureIndex, 1, action.payload);
      })
      .addCase(editAdventureAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setSingleAdventure } = adventuresSlice.actions;
export const selectAdventures = (state: RootState) => state.adventures;
export default adventuresSlice.reducer;
