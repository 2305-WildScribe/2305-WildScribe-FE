import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Adventure } from '../../types';

// import { userLogin, fetchUserAdventures} from '../../apiCalls'

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
    );
    if (response.status === 404) {
      throw new Error('404 page not found');
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  }
);

export const postAdventureAsync = createAsyncThunk(
  'post/addAdventure',
  async (
    { newAdventure, userID }: { newAdventure: Adventure; userID: string },
    thunkAPI
  ) => {
    console.log('Thunk dun thanked');
    const {
      activity,
      date,
      beta_notes,
      image_url,
      stress_level,
      hydration,
      diet,
      hours_slept: sleep,
      diet_hydration_notes,
      sleep_stress_notes,
    } = newAdventure;
    const response = await fetch(
      'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/adventure',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'adventure',
            attributes: {
              user_id: userID,
              activity,
              date,
              beta_notes,
              image_url,
              stress_level,
              hydration,
              diet,
              hours_slept: sleep,
              diet_hydration_notes,
              sleep_stress_notes,
            },
          },
        }),
      }
    );
    if (response.status === 404) {
      throw new Error('404 page not found');
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log('data', data);
    // newAdventure.adventure_id = data.attributes.adventure_id;
    // console.log('new adv here', newAdventure);
    // const completeAdventure = {
    //   ...newAdventure,
    //   adventure_id: data.attributes.adventure_id,
    // };
    // console.log(completeAdventure);
    return { newAdventure, data };
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
