import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Adventure } from '../../types';

// import { userLogin, fetchUserAdventures} from '../../apiCalls'

interface AdventureState {
  adventures: Adventure[];
}

const initialState: AdventureState = {
  adventures: [],
};

export const adventuresSlice = createSlice({
  name: 'adventures',
  initialState,
  reducers: {
    addAdventure: (state, action: PayloadAction<Adventure>) => {
      state.adventures.push(action.payload);
    },
  },
});

export const { addAdventure } = adventuresSlice.actions;
export const selectAdventures = (state: RootState) => state.adventures.adventures
export default adventuresSlice.reducer


