import Adventure from '../types';

export async function fetchUserLogs() {
  try {
    const response = await fetch(
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
    );
    if (!response.ok) {
      throw new Error('error');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
  }
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
