import { Adventure } from './types';

export async function fetchUserLogs(user_id: string) {
  console.log(user_id)
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

export async function postNewAdventure(newAdventureData: Adventure) {
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

  let newAdventure = {
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
  };

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
            type: 'adventures',
            user_id: 12,
            attributes: {
              newAdventure,
            },
          },
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Oops, something went wrong. Please try again later.');
    }
    return await response.json();
  } catch (error) {}
}

export async function userLogin(email:string, password:string) {
  console.log('email',email)
  console.log("password",password)
  return fetch(
    'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user',
    {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "data":{
            "type": "user",
            "attributes": {
                "email": email,
                "password": password
            }
        }
    }),
    }
  ).then((response) => {
    console.log('response---->',response)
    if (response.status === 404) {
      throw new Error('404 page not found');
    }
    if (!response.ok) {
      throw new Error('error');
    }
    return response.json();
  });
}