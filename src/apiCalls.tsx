import { Adventure } from '../types';

export async function fetchUserLogs() {
  return fetch(
    'https://117105e4-6093-4d95-8632-31f93d58b35a.mock.pstmn.io/api/v0/adventures',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: 'adventures',
          user_id: 12,
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
  try {
    const response = await fetch(
      'https://117105e4-6093-4d95-8632-31f93d58b35a.mock.pstmn.io/api/v0/user/adventures',
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
              newAdventureData,
            },
          },
        }),
      }
    );
    if (!response.ok) {
      throw new Error('error');
    }
    return await response.json();
  } catch (error) {}
}
