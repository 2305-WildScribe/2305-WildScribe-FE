import { Adventure } from './types';

export async function fetchUserAdventures(user_id: string | undefined) {
  // console.log('user_id in fetch adventure call', typeof user_id);
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
    if (!response.ok) {
      throw new Error('Oops, something went wrong. Please try again later.');
    }
    return await response.json();
  } catch (error) {}
}

export async function userLogin(email: string, password: string) {
  // console.log('email', email)
  // console.log("password", password)
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

export async function deleteAdventure(id: string | undefined) {
  return fetch(
    'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/adventure',
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
  ).then((response) => {
    console.log('res', response);
    if (response.status === 404) {
      throw new Error('404 page not found');
    }
    if (!response.ok) {
      throw new Error('error');
    }
    return response.json();
  });
}

export async function editLog(updatedLog: any) {
  console.log('updatedLog in api call', updatedLog);
  
  const { user_id,
    adventure_id,
    activity,
    date,
    notes,
    image_url,
    stress_level,
    hours_slept,
    sleep_stress_notes,
    hydration,
    diet,
    diet_hydration_notes,
    beta_notes} = updatedLog
    
  return fetch(
    'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/adventure',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "data": {
            "type": "adventure",
            "attributes": {
                "user_id": user_id,
                "adventure_id": adventure_id,
                "activity": activity,
                "date": date,
                "notes": notes,
                "image_url": image_url,
                "stress_level": stress_level,
                "hours_slept": hours_slept,
                "sleep_stress_notes": sleep_stress_notes,
                "hydration": hydration,
                "diet": diet,
                "diet_hydration_notes": diet_hydration_notes,
                "beta_notes": beta_notes
            }
        }
    }),
    }
  ).then((response) => {
    console.log('PUT response-->', response);
    if (response.status === 404) {
      throw new Error('404 page not found');
    }
    if (!response.ok) {
      throw new Error('error');
    }
    return response.json();
  });
}
