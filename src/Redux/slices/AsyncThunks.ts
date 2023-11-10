import { createAsyncThunk } from '@reduxjs/toolkit';
import { Adventure } from '../../types';

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
    newAdventure: Adventure,
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
      user_id,
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
              user_id,
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
    return { newAdventure, data };
  }
);
