import { createAsyncThunk } from '@reduxjs/toolkit';
import { Adventure } from '../../types';

export const userLoginAsync = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const response = await fetch(
      'https://wildscribe.azurewebsites.net/api/v0/user',
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
      'https://wildscribe.azurewebsites.net/api/v0/adventures',
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
  async (newAdventure: Adventure, thunkAPI) => {
    const {
      activity,
      date,
      beta_notes,
      image_url,
      stress_level,
      hydration,
      diet,
      lat,
      lon,
      hours_slept: sleep,
      diet_hydration_notes,
      sleep_stress_notes,
      user_id,
    } = newAdventure;
    const response = await fetch(
      'https://wildscribe.azurewebsites.net/api/v0/adventure',
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
              lat,
              lon,
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

export const deleteAdventureAsync = createAsyncThunk(
  'post/deleteAdventure',
  async (id: string | undefined, thunkAPI) => {
    const response = await fetch(
      'https://wildscribe.azurewebsites.net/api/v0/adventure',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'adventure',
            attributes: {
              adventure_id: id,
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

    await response.json();
    return id;
  }
);

export const editAdventureAsync = createAsyncThunk(
  'edit/addAdventure',
  async (editedAdventure: any, thunkAPI) => {
    const {
      user_id,
      adventure_id,
      activity,
      date,
      image_url,
      stress_level,
      hours_slept,
      sleep_stress_notes,
      hydration,
      diet,
      lat,
      lon,
      diet_hydration_notes,
      beta_notes,
    } = editedAdventure;

    const response = await fetch(
      'https://wildscribe.azurewebsites.net/api/v0/adventure',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'adventure',
            attributes: {
              user_id: user_id,
              adventure_id: adventure_id,
              activity: activity,
              date: date,
              image_url: image_url,
              stress_level: stress_level,
              hours_slept: hours_slept,
              sleep_stress_notes: sleep_stress_notes,
              hydration: hydration,
              diet: diet,
              lat: lat,
              lon: lon,
              diet_hydration_notes: diet_hydration_notes,
              beta_notes: beta_notes,
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

    await response.json();
    return editedAdventure;
  }
);
