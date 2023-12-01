import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Adventure } from '../../types';
import {
  deleteAdventureAsync,
  editAdventureAsync,
  getAdventuresAsync,
  postAdventureAsync,
} from './AsyncThunks';

interface AdventureState {
  adventures: Adventure[] | [];
  loading: boolean;
  error: string | undefined;
  singleAdventure: Adventure | undefined;
  activityTypes: string[];
  singleLog: string | null;
}

const initialState: AdventureState = {
  adventures: [],
  loading: false,
  error: '',
  singleAdventure: undefined,
  activityTypes: [],
  singleLog: null,
};

export const adventuresSlice = createSlice({
  name: 'adventures',
  initialState,
  reducers: {
    setSingleAdventure(state, action: PayloadAction<Adventure | undefined>) {
      state.singleAdventure = action.payload;
    },
    setSingleLog(state, action: PayloadAction<string | null>) {
      state.singleLog = action.payload;
    },
    setActivityTypes(state, action: PayloadAction<Adventure[] | undefined>) {
      let types: string[] = [];
      action.payload?.forEach((adventure) => {
        if (!types.includes(adventure.activity)) {
          types.push(adventure.activity);
        }
      });
      state.activityTypes = [...types];
    },
    addNewActivityType(state, action: PayloadAction<string>) {
      state.activityTypes = [...state.activityTypes, action.payload];
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
        newAdventure.adventure_id = data.data.attributes[0].adventure_id;
        state.adventures = [...(state.adventures || []), newAdventure];
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

export const { setSingleAdventure, setActivityTypes, addNewActivityType, setSingleLog } =
  adventuresSlice.actions;
export const selectAdventures = (state: RootState) => state.adventures;
export default adventuresSlice.reducer;
