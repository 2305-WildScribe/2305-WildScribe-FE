import { Adventure } from './types';

export async function fetchUserAdventures(user_id: string) {
  console.log('user_id in fetch adventure call', typeof user_id);
  return fetch(
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
            user_id,
          },
        },
      }),
    }
  ).then((response) => {
    if (response.status === 404) {
      throw new Error('404 page not found');
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export async function postNewAdventure(
  newAdventureData: Adventure,
  id: string | null
) {
  const {
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
  } = newAdventureData;

  try {
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
              user_id: id,
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
    console.log('post response -->', response);
    if (!response.ok) {
      throw new Error('Oops, something went wrong. Please try again later.');
    }
    return await response.json();
  } catch (error) {}
}

export async function userLogin(email: string, password: string) {
  return fetch(
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
  ).then((response) => {
    if (response.status === 404) {
      throw new Error('404 page not found');
    }
    if (!response.ok) {
      throw new Error('error');
    }
    return response.json();
  });
}
